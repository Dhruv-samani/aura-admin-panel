export const roleDesignData = {
  Request: {
    View: true,
    Create: {
      checked: true,
      children: {
        CreateRequester: false
      }
    },
    Update: {
      checked: true,
      children: {
        Assign: false,
        UpdatePriority: false,
        UpdateStatus: {
          checked: false,
          children: {
             ResolveRequest: false,
             CloseRequest: false,
             ReOpenRequest: false
          }
        },
        ManageSolution: {
           checked: false,
           children: {
              MergeUnmergeRequest: false,
           }
        },
        ViewTasks: {
            checked: false,
            children: {
                Create: false,
                Update: false
            }
        }
      }
    }
  },
  Release: {
     View: false,
     Create: false,
  },
  CMDB: {
     View: false,
  },
  Change: {
     View: false,
  }
};
