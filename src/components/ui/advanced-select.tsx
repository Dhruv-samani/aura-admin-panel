import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AdvancedSelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  onInputChange?: (value: string) => void;
  onRemove?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'min-h-8 text-sm px-2 py-1',
  md: 'min-h-10 text-sm px-3 py-2',
  lg: 'min-h-12 text-base px-4 py-3',
};

const chipSizeClasses = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-1',
  lg: 'text-sm px-2.5 py-1.5',
};

export function AdvancedSelect({
  options,
  value,
  onChange,
  onInputChange,
  onRemove,
  onClear,
  placeholder = 'Search...',
  multiple = false,
  size = 'md',
  disabled = false,
  className,
}: AdvancedSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedValues = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    const lowerQuery = query.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(lowerQuery));
  }, [options, query]);

  const handleSelect = useCallback((optionValue: string) => {
    if (multiple) {
      const newValue = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange?.(newValue);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
      setQuery('');
    }
  }, [multiple, selectedValues, onChange]);

  const handleRemove = useCallback((optionValue: string) => {
    const newValue = selectedValues.filter((v) => v !== optionValue);
    onChange?.(multiple ? newValue : '');
    onRemove?.(optionValue);
  }, [selectedValues, onChange, onRemove, multiple]);

  const handleClear = useCallback(() => {
    onChange?.(multiple ? [] : '');
    onClear?.();
    setQuery('');
  }, [onChange, onClear, multiple]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onInputChange?.(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredOptions[highlightedIndex]) {
      e.preventDefault();
      handleSelect(filteredOptions[highlightedIndex].value);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Backspace' && !query && selectedValues.length > 0) {
      handleRemove(selectedValues[selectedValues.length - 1]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions]);

  const getOptionLabel = (val: string) => options.find((o) => o.value === val)?.label || val;

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div
        onClick={() => {
          if (!disabled) {
            setIsOpen(true);
            inputRef.current?.focus();
          }
        }}
        className={cn(
          'flex flex-wrap items-center gap-1.5 bg-background border border-input rounded-lg cursor-text transition-colors',
          isOpen && 'ring-2 ring-ring ring-offset-2 ring-offset-background',
          disabled && 'opacity-50 cursor-not-allowed',
          sizeClasses[size]
        )}
      >
        {/* Chips for selected values */}
        {multiple && selectedValues.map((val) => (
          <span
            key={val}
            className={cn(
              'inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-md',
              chipSizeClasses[size]
            )}
          >
            {getOptionLabel(val)}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(val);
              }}
              className="hover:bg-primary-foreground/20 rounded-full p-0.5"
            >
              <X size={12} />
            </button>
          </span>
        ))}

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedValues.length === 0 ? placeholder : ''}
          disabled={disabled}
          className="flex-1 min-w-[60px] bg-transparent outline-none placeholder:text-muted-foreground"
        />

        {/* Clear & Chevron */}
        <div className="flex items-center gap-1 shrink-0">
          {selectedValues.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-0.5 hover:bg-muted rounded"
            >
              <X size={14} className="text-muted-foreground" />
            </button>
          )}
          <ChevronDown
            size={16}
            className={cn(
              'text-muted-foreground transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto animate-scale-in">
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-4 text-sm text-muted-foreground text-center">
              No options found
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 text-sm text-start transition-colors',
                    index === highlightedIndex && 'bg-muted',
                    isSelected && 'text-primary font-medium',
                    option.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check size={16} className="text-primary" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
