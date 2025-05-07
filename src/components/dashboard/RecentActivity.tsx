import { Activity } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Plus, Minus, RefreshCw, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (activity: Activity) => {
    // First determine the icon based on activity type
    const typeIcons = {
      add: <Plus size={16} className="text-green-500" />,
      remove: <Minus size={16} className="text-red-500" />,
      update: <RefreshCw size={16} className="text-blue-500" />,
      delete: <Trash size={16} className="text-destructive" />,
    };

    // Base icon container
    return (
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
        {typeIcons[activity.type]}
      </div>
    );
  };

  const getActivityTypeText = (activity: Activity) => {
    const typeText = {
      add: "added",
      remove: "removed",
      update: "updated",
      delete: "deleted",
    };

    const entityTypeText = {
      product: "product",
      supplier: "supplier",
      category: "category",
      stock: "stock",
    };

    let text = `${typeText[activity.type]} ${
      entityTypeText[activity.entityType]
    }`;

    if (activity.type === "add" || activity.type === "remove") {
      if (activity.quantity) {
        text = `${typeText[activity.type]} ${activity.quantity} ${
          entityTypeText[activity.entityType]
        } items`;
      }
    }

    return text;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              {getActivityIcon(activity)}

              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.userName}</span>{" "}
                  {getActivityTypeText(activity)}{" "}
                  <span className="font-medium">{activity.entityName}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
