import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { AdvancedSelect, SelectOption } from '@/components/ui/advanced-select';
import { toast } from 'sonner';
import { Info, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const departmentOptions: SelectOption[] = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'design', label: 'Design' },
  { value: 'devops', label: 'DevOps' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
];

export default function ComponentShowcase() {
  const [singleValue, setSingleValue] = useState('');
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [switchValue, setSwitchValue] = useState(false);
  const [progress, setProgress] = useState(60);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Component Showcase</h1>
        <p className="text-muted-foreground mt-1">
          Browse and test all available UI components.
        </p>
      </div>

      <Tabs defaultValue="buttons" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="select">Select</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="data">Data Display</TabsTrigger>
        </TabsList>

        {/* Buttons Tab */}
        <TabsContent value="buttons" className="space-y-6">
          <section className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Button Variants</h2>
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </section>

          <section className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Button Sizes</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Sparkles size={18} /></Button>
            </div>
          </section>

          <section className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Badges</h2>
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </section>
        </TabsContent>

        {/* Inputs Tab */}
        <TabsContent value="inputs" className="space-y-6">
          <section className="bg-card rounded-xl border border-border p-6 shadow-soft space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Text Inputs</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="default-input">Default Input</Label>
                <Input id="default-input" placeholder="Enter text..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled-input">Disabled Input</Label>
                <Input id="disabled-input" placeholder="Disabled..." disabled />
              </div>
            </div>
          </section>

          <section className="bg-card rounded-xl border border-border p-6 shadow-soft space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Textarea</h2>
            <Textarea placeholder="Write your message here..." rows={4} />
          </section>

          <section className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Toggle Switch</h2>
            <div className="flex items-center gap-3">
              <Switch
                id="toggle-demo"
                checked={switchValue}
                onCheckedChange={setSwitchValue}
              />
              <Label htmlFor="toggle-demo">
                {switchValue ? 'Enabled' : 'Disabled'}
              </Label>
            </div>
          </section>
        </TabsContent>

        {/* Select Tab */}
        <TabsContent value="select" className="space-y-6">
          <section className="bg-card rounded-xl border border-border p-6 shadow-soft space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Single Select (Autocomplete)</h2>
            <p className="text-sm text-muted-foreground mb-4">Type to search, keyboard navigation supported.</p>
            <AdvancedSelect
              options={departmentOptions}
              value={singleValue}
              onChange={(val) => setSingleValue(val as string)}
              placeholder="Search department..."
              className="max-w-md"
            />
            {singleValue && (
              <p className="text-sm text-muted-foreground">Selected: <strong>{singleValue}</strong></p>
            )}
          </section>

          <section className="bg-card rounded-xl border border-border p-6 shadow-soft space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Multi-Select with Chips</h2>
            <p className="text-sm text-muted-foreground mb-4">Select multiple options. Each shows as a removable chip.</p>
            <AdvancedSelect
              options={departmentOptions}
              value={multiValue}
              onChange={(val) => setMultiValue(val as string[])}
              placeholder="Search departments..."
              multiple
              className="max-w-md"
            />
            {multiValue.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Selected: <strong>{multiValue.join(', ')}</strong>
              </p>
            )}
          </section>

          <section className="bg-card rounded-xl border border-border p-6 shadow-soft space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Size Variants</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <Label className="mb-2 block">Small</Label>
                <AdvancedSelect options={departmentOptions} placeholder="Small..." size="sm" />
              </div>
              <div>
                <Label className="mb-2 block">Medium (Default)</Label>
                <AdvancedSelect options={departmentOptions} placeholder="Medium..." size="md" />
              </div>
              <div>
                <Label className="mb-2 block">Large</Label>
                <AdvancedSelect options={departmentOptions} placeholder="Large..." size="lg" />
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <section className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Toast Notifications</h2>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toast.success('Action completed successfully!')}>
                Success Toast
              </Button>
              <Button variant="outline" onClick={() => toast.error('Something went wrong!')}>
                Error Toast
              </Button>
              <Button variant="secondary" onClick={() => toast.info('Here is some info')}>
                Info Toast
              </Button>
            </div>
          </section>

          <section className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Tooltips</h2>
            <div className="flex flex-wrap gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Info size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Helpful information tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <AlertCircle size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Warning: Check this carefully</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <CheckCircle size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Verified and approved</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </section>

          <section className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Progress</h2>
            <div className="space-y-4">
              <Progress value={progress} className="w-full" />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setProgress((p) => Math.max(0, p - 10))}>
                  -10%
                </Button>
                <Button size="sm" variant="outline" onClick={() => setProgress((p) => Math.min(100, p + 10))}>
                  +10%
                </Button>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Data Display Tab */}
        <TabsContent value="data" className="space-y-6">
          <section className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Avatars</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
              </Avatar>
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-info text-info-foreground text-xl">XY</AvatarFallback>
              </Avatar>
            </div>
          </section>

          <section className="bg-card rounded-xl border border-border p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-4">Skeletons</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
              <Skeleton className="h-20 w-full" />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
