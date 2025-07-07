import { createLoader, simulateApiDelay } from './index';

// Admin specific loaders
interface AdminData {
  id: string;
  name: string;
  email: string;
  username: string;
  status: 'active' | 'inactive';
  permissions: string[];
  createdDate: string;
  lastLogin?: string;
}

interface TraineeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'active' | 'inactive' | 'completed';
  startDate?: string;
  endDate?: string;
  appliedDate: string;
  program: string;
  hasCredentials: boolean;
}

const loadAdmins = async (): Promise<AdminData[]> => {
  await simulateApiDelay(900);
  
  return [
    {
      id: '1',
      name: 'John Admin',
      email: 'john.admin@ojtportal.com',
      username: 'admin1',
      status: 'active',
      permissions: ['manage_trainees', 'view_reports', 'manage_attendance'],
      createdDate: '2024-01-15',
      lastLogin: '2024-01-25T10:30:00Z'
    },
    {
      id: '2',
      name: 'Sarah Manager',
      email: 'sarah.manager@ojtportal.com',
      username: 'admin2',
      status: 'active',
      permissions: ['manage_trainees', 'manage_payments', 'send_notifications'],
      createdDate: '2024-01-10',
      lastLogin: '2024-01-24T15:45:00Z'
    },
    {
      id: '3',
      name: 'Mike Supervisor',
      email: 'mike.supervisor@ojtportal.com',
      username: 'admin3',
      status: 'inactive',
      permissions: ['view_reports', 'manage_attendance'],
      createdDate: '2024-01-05'
    }
  ];
};

const loadTrainees = async (): Promise<TraineeData[]> => {
  await simulateApiDelay(1100);
  
  return [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      phone: '+94 77 111 2222',
      status: 'new',
      appliedDate: '2024-01-20',
      program: 'Software Development',
      hasCredentials: false
    },
    {
      id: '2',
      name: 'Emma Davis',
      email: 'emma.davis@email.com',
      phone: '+94 77 333 4444',
      status: 'new',
      appliedDate: '2024-01-22',
      program: 'Web Development',
      hasCredentials: false
    },
    {
      id: '3',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+94 77 123 4567',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      appliedDate: '2024-01-10',
      program: 'Software Development',
      hasCredentials: true
    },
    {
      id: '4',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+94 77 234 5678',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-07-15',
      appliedDate: '2024-01-08',
      program: 'Software Development',
      hasCredentials: true
    }
  ];
};

export const adminsLoader = createLoader(loadAdmins, 700);
export const traineesLoader = createLoader(loadTrainees, 700);