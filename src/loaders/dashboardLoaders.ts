import { createLoader, simulateApiDelay } from './index';

// Mock data interfaces
interface DashboardStats {
  totalTrainees: number;
  activeTrainees: number;
  totalRevenue: number;
  monthlyRevenue: number;
  attendanceRate: number;
  completionRate: number;
}

interface RecentActivity {
  id: string;
  type: string;
  message: string;
  time: string;
  icon: string;
  color: string;
}

interface AdminDashboardData {
  stats: DashboardStats;
  recentActivities: RecentActivity[];
  upcomingEvents: any[];
}

interface SuperAdminDashboardData {
  stats: {
    totalAdmins: number;
    activeAdmins: number;
    totalTrainees: number;
    activeTrainees: number;
    newTrainees: number;
    inactiveTrainees: number;
  };
  recentActivities: RecentActivity[];
  pendingActions: any[];
}

// Admin Dashboard Loader
const loadAdminDashboard = async (): Promise<AdminDashboardData> => {
  await simulateApiDelay(1200);
  
  return {
    stats: {
      totalTrainees: 45,
      activeTrainees: 42,
      totalRevenue: 675000,
      monthlyRevenue: 67500,
      attendanceRate: 94.2,
      completionRate: 87.5
    },
    recentActivities: [
      {
        id: '1',
        type: 'payment',
        message: 'John Doe completed payment for January',
        time: '2 hours ago',
        icon: 'DollarSign',
        color: 'text-green-600'
      },
      {
        id: '2',
        type: 'attendance',
        message: 'Jane Smith marked present for today',
        time: '3 hours ago',
        icon: 'UserCheck',
        color: 'text-blue-600'
      },
      {
        id: '3',
        type: 'alert',
        message: 'Mike Johnson has missed 3 consecutive days',
        time: '5 hours ago',
        icon: 'AlertTriangle',
        color: 'text-red-600'
      }
    ],
    upcomingEvents: [
      {
        id: '1',
        title: 'React Advanced Training',
        date: '2024-01-30',
        time: '09:00 AM',
        attendees: 15,
        type: 'training'
      },
      {
        id: '2',
        title: 'Monthly Assessment',
        date: '2024-02-01',
        time: '02:00 PM',
        attendees: 42,
        type: 'assessment'
      }
    ]
  };
};

// Super Admin Dashboard Loader
const loadSuperAdminDashboard = async (): Promise<SuperAdminDashboardData> => {
  await simulateApiDelay(1000);
  
  return {
    stats: {
      totalAdmins: 5,
      activeAdmins: 4,
      totalTrainees: 45,
      activeTrainees: 32,
      newTrainees: 8,
      inactiveTrainees: 5
    },
    recentActivities: [
      {
        id: '1',
        type: 'admin_created',
        message: 'New admin "Sarah Johnson" created with trainee management permissions',
        time: '2 hours ago',
        icon: 'Shield',
        color: 'text-purple-600'
      },
      {
        id: '2',
        type: 'trainee_registered',
        message: '3 new trainees registered and awaiting activation',
        time: '4 hours ago',
        icon: 'UserCheck',
        color: 'text-blue-600'
      }
    ],
    pendingActions: [
      {
        id: '1',
        title: 'New Trainee Applications',
        count: 8,
        description: 'Trainees waiting for approval and activation',
        action: 'Review Applications',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Admin Permission Requests',
        count: 2,
        description: 'Admins requesting additional permissions',
        action: 'Review Requests',
        priority: 'medium'
      }
    ]
  };
};

export const adminDashboardLoader = createLoader(loadAdminDashboard, 800);
export const superAdminDashboardLoader = createLoader(loadSuperAdminDashboard, 800);