import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Customer, 
  Provider, 
  Account, 
  Sale, 
  Renewal,
  Recharge,
  FinancialSummary,
  Platform,
  Profile,
  Payment
} from '../types';

// Sample data initialization
const initialCustomers: Customer[] = [];
const initialProviders: Provider[] = [];
const initialAccounts: Account[] = [];
const initialSales: Sale[] = [];
const initialRecharges: Recharge[] = [];
const initialProfiles: Profile[] = [];
const initialPayments: Payment[] = [];

// Initialize local storage with sample data if empty
const initializeData = () => {
  if (!localStorage.getItem('customers')) {
    localStorage.setItem('customers', JSON.stringify(initialCustomers));
  }
  if (!localStorage.getItem('providers')) {
    localStorage.setItem('providers', JSON.stringify(initialProviders));
  }
  if (!localStorage.getItem('accounts')) {
    localStorage.setItem('accounts', JSON.stringify(initialAccounts));
  }
  if (!localStorage.getItem('sales')) {
    localStorage.setItem('sales', JSON.stringify(initialSales));
  }
  if (!localStorage.getItem('recharges')) {
    localStorage.setItem('recharges', JSON.stringify(initialRecharges));
  }
  if (!localStorage.getItem('profiles')) {
    localStorage.setItem('profiles', JSON.stringify(initialProfiles));
  }
  if (!localStorage.getItem('payments')) {
    localStorage.setItem('payments', JSON.stringify(initialPayments));
  }
};

interface DataContextType {
  // Customer methods
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  getCustomerById: (id: string) => Customer | undefined;
  
  // Provider methods
  providers: Provider[];
  addProvider: (provider: Omit<Provider, 'id'>) => string;
  updateProvider: (id: string, provider: Partial<Provider>) => void;
  deleteProvider: (id: string) => void;
  getProviderById: (id: string) => Provider | undefined;
  
  // Account methods
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id'>) => string;
  updateAccount: (id: string, account: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  getAccountById: (id: string) => Account | undefined;
  getAvailableAccounts: (platform?: Platform) => Account[];
  
  // Sale methods
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id' | 'renewalHistory'>) => string;
  updateSale: (id: string, sale: Partial<Sale>) => void;
  cancelSale: (id: string) => void;
  getSaleById: (id: string) => Sale | undefined;
  getSalesByCustomerId: (customerId: string) => Sale[];
  getSalesByAccountId: (accountId: string) => Sale[];
  getSalesExpiringOn: (date: Date) => Sale[];
  renewSale: (saleId: string, renewal: Omit<Renewal, 'id' | 'saleId'>) => void;
  
  // Recharge methods
  recharges: Recharge[];
  addRecharge: (recharge: Omit<Recharge, 'id'>) => void;
  updateRecharge: (id: string, recharge: Partial<Recharge>) => void;
  deleteRecharge: (id: string) => void;
  getRechargesByCustomerId: (customerId: string) => Recharge[];
  
  // Profile methods
  profiles: Profile[];
  addProfile: (profile: Omit<Profile, 'id'>) => void;
  updateProfile: (id: string, profile: Partial<Profile>) => void;
  deleteProfile: (id: string) => void;
  getProfileById: (id: string) => Profile | undefined;
  
  // Financial methods
  getFinancialSummary: (startDate: Date, endDate: Date) => FinancialSummary;
  
  // Payment methods
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  updatePayment: (id: string, payment: Partial<Payment>) => void;
  deletePayment: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [recharges, setRecharges] = useState<Recharge[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Initialize data
  useEffect(() => {
    initializeData();
    
    // Load data from localStorage
    const storedCustomers = localStorage.getItem('customers');
    const storedProviders = localStorage.getItem('providers');
    const storedAccounts = localStorage.getItem('accounts');
    const storedSales = localStorage.getItem('sales');
    const storedRecharges = localStorage.getItem('recharges');
    const storedProfiles = localStorage.getItem('profiles');
    const storedPayments = localStorage.getItem('payments');
    
    if (storedCustomers) setCustomers(JSON.parse(storedCustomers));
    if (storedProviders) setProviders(JSON.parse(storedProviders));
    if (storedAccounts) setAccounts(JSON.parse(storedAccounts));
    if (storedSales) setSales(JSON.parse(storedSales));
    if (storedRecharges) setRecharges(JSON.parse(storedRecharges));
    if (storedProfiles) setProfiles(JSON.parse(storedProfiles));
    if (storedPayments) setPayments(JSON.parse(storedPayments));
  }, []);

  // Consolidar los múltiples useEffect para sincronizar datos con localStorage
  useEffect(() => {
    const syncDataToLocalStorage = () => {
      localStorage.setItem('customers', JSON.stringify(customers));
      localStorage.setItem('providers', JSON.stringify(providers));
      localStorage.setItem('accounts', JSON.stringify(accounts));
      localStorage.setItem('sales', JSON.stringify(sales));
      localStorage.setItem('recharges', JSON.stringify(recharges));
      localStorage.setItem('profiles', JSON.stringify(profiles));
      localStorage.setItem('payments', JSON.stringify(payments));
    };

    syncDataToLocalStorage();
  }, [customers, providers, accounts, sales, recharges, profiles, payments]);

  // Customer methods
  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    try {
      const newCustomer: Customer = {
        ...customer,
        id: uuidv4(),
        createdAt: new Date()
      };
      setCustomers([...customers, newCustomer]);
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const updateCustomer = (id: string, customer: Partial<Customer>) => {
    try {
      setCustomers(customers.map(c => c.id === id ? { ...c, ...customer } : c));
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const deleteCustomer = (id: string) => {
    try {
      setCustomers(customers.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const getCustomerById = (id: string) => {
    return customers.find(c => c.id === id);
  };

  // Provider methods
  const addProvider = (provider: Omit<Provider, 'id'>) => {
    const id = uuidv4();
    const newProvider: Provider = {
      ...provider,
      id
    };
    setProviders([...providers, newProvider]);
    return id;
  };

  const updateProvider = (id: string, provider: Partial<Provider>) => {
    setProviders(providers.map(p => p.id === id ? { ...p, ...provider } : p));
  };

  const deleteProvider = (id: string) => {
    setProviders(providers.filter(p => p.id !== id));
  };

  const getProviderById = (id: string) => {
    return providers.find(p => p.id === id);
  };

  // Account methods
  const addAccount = (account: Omit<Account, 'id'>) => {
    const id = uuidv4();
    const newAccount: Account = {
      ...account,
      id
    };
    setAccounts([...accounts, newAccount]);
    return id;
  };

  const updateAccount = (id: string, account: Partial<Account>) => {
    setAccounts(accounts.map(a => a.id === id ? { ...a, ...account } : a));
  };

  const deleteAccount = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id));
  };

  const getAccountById = (id: string) => {
    return accounts.find(a => a.id === id);
  };

  const getAvailableAccounts = (platform?: Platform) => {
    return accounts.filter(a => 
      a.status === 'available' && 
      (platform ? a.platform === platform : true)
    );
  };

  // Sale methods
  const addSale = (sale: Omit<Sale, 'id' | 'renewalHistory'>) => {
    const id = uuidv4();
    const newSale: Sale = {
      ...sale,
      id,
      renewalHistory: [],
      status: 'active'
    };
    
    // Update account status to rented
    updateAccount(sale.accountId, { status: 'rented' });
    
    setSales([...sales, newSale]);
    return id;
  };

  const updateSale = (id: string, sale: Partial<Sale>) => {
    setSales(sales.map(s => s.id === id ? { ...s, ...sale } : s));
  };

  const cancelSale = (id: string) => {
    const sale = sales.find(s => s.id === id);
    if (sale) {
      // Mark the sale as cancelled
      updateSale(id, { status: 'cancelled' });
      
      // Make the account available again
      updateAccount(sale.accountId, { status: 'available' });
    }
  };

  const getSaleById = (id: string) => {
    return sales.find(s => s.id === id);
  };

  const getSalesByCustomerId = (customerId: string) => {
    return sales.filter(s => s.customerId === customerId);
  };

  const getSalesByAccountId = (accountId: string) => {
    return sales.filter(s => s.accountId === accountId);
  };

  const getSalesExpiringOn = (date: Date) => {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    return sales.filter(s => {
      const expiryDate = new Date(s.expiryDate);
      expiryDate.setHours(0, 0, 0, 0);
      return expiryDate.getTime() === targetDate.getTime() && s.status === 'active';
    });
  };

  const renewSale = (saleId: string, renewal: Omit<Renewal, 'id' | 'saleId'>) => {
    const sale = sales.find(s => s.id === saleId);
    if (!sale) return;
    
    const newRenewal: Renewal = {
      ...renewal,
      id: uuidv4(),
      saleId
    };
    
    const updatedSale: Sale = {
      ...sale,
      expiryDate: renewal.nextPaymentDate,
      renewalHistory: [...sale.renewalHistory, newRenewal]
    };
    
    setSales(sales.map(s => s.id === saleId ? updatedSale : s));
  };

  // Recharge methods
  const addRecharge = (recharge: Omit<Recharge, 'id'>) => {
    const newRecharge: Recharge = {
      ...recharge,
      id: uuidv4()
    };
    setRecharges([...recharges, newRecharge]);
  };

  const updateRecharge = (id: string, recharge: Partial<Recharge>) => {
    setRecharges(recharges.map(r => r.id === id ? { ...r, ...recharge } : r));
  };

  const deleteRecharge = (id: string) => {
    setRecharges(recharges.filter(r => r.id !== id));
  };

  const getRechargesByCustomerId = (customerId: string) => {
    return recharges.filter(r => r.customerId === customerId);
  };

  // Profile methods
  const addProfile = (profile: Omit<Profile, 'id'>) => {
    const newProfile: Profile = {
      ...profile,
      id: uuidv4(),
    };
    setProfiles([...profiles, newProfile]);
  };

  const updateProfile = (id: string, profile: Partial<Profile>) => {
    setProfiles(profiles.map(p => p.id === id ? { ...p, ...profile } : p));
  };

  const deleteProfile = (id: string) => {
    setProfiles(profiles.filter(p => p.id !== id));
  };

  const getProfileById = (id: string) => {
    return profiles.find(p => p.id === id);
  };

  // Financial methods
  const getFinancialSummary = (startDate: Date, endDate: Date): FinancialSummary => {
    // Filter sales and recharges within date range
    const filteredSales = sales.filter(s => {
      const date = new Date(s.paymentDate);
      return date >= startDate && date <= endDate;
    });
    
    const filteredRecharges = recharges.filter(r => {
      const date = new Date(r.paymentDate);
      return date >= startDate && date <= endDate;
    });
    
    // Calculate total income from sales and recharges
    const salesIncome = filteredSales.reduce((sum, sale) => sum + sale.price, 0);
    const rechargeIncome = filteredRecharges.reduce((sum, recharge) => sum + recharge.price, 0);
    const totalIncome = salesIncome + rechargeIncome;
    
    // Calculate total expenses from accounts
    const accountExpenses = filteredSales.reduce((sum, sale) => {
      const account = accounts.find(a => a.id === sale.accountId);
      return sum + (account?.cost || 0);
    }, 0);
    
    const rechargeExpenses = filteredRecharges.reduce((sum, recharge) => sum + recharge.cost, 0);
    const totalExpenses = accountExpenses + rechargeExpenses;
    
    // Calculate platform-specific breakdowns
    const platforms = Array.from(new Set(filteredSales.map(s => s.platform)));
    const platformBreakdown = platforms.map(platform => {
      const platformSales = filteredSales.filter(s => s.platform === platform);
      const platformIncome = platformSales.reduce((sum, sale) => sum + sale.price, 0);
      const platformExpenses = platformSales.reduce((sum, sale) => {
        const account = accounts.find(a => a.id === sale.accountId);
        return sum + (account?.cost || 0);
      }, 0);
      
      return {
        platform,
        income: platformIncome,
        expenses: platformExpenses,
        balance: platformIncome - platformExpenses
      };
    });
    
    return {
      income: totalIncome,
      expenses: totalExpenses,
      balance: totalIncome - totalExpenses,
      platformBreakdown
    };
  };

  // Payment methods
  const addPayment = (payment: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...payment,
      id: uuidv4(),
    };
    setPayments([...payments, newPayment]);
  };

  const updatePayment = (id: string, payment: Partial<Payment>) => {
    try {
      setPayments(payments.map(p => p.id === id ? { ...p, ...payment } : p));
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const deletePayment = (id: string) => {
    try {
      setPayments(payments.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const value = {
    // Customer methods
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    
    // Provider methods
    providers,
    addProvider,
    updateProvider,
    deleteProvider,
    getProviderById,
    
    // Account methods
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    getAccountById,
    getAvailableAccounts,
    
    // Sale methods
    sales,
    addSale,
    updateSale,
    cancelSale,
    getSaleById,
    getSalesByCustomerId,
    getSalesByAccountId,
    getSalesExpiringOn,
    renewSale,
    
    // Recharge methods
    recharges,
    addRecharge,
    updateRecharge,
    deleteRecharge,
    getRechargesByCustomerId,
    
    // Profile methods
    profiles,
    addProfile,
    updateProfile,
    deleteProfile,
    getProfileById,
    
    // Financial methods
    getFinancialSummary,
    
    // Payment methods
    payments,
    addPayment,
    updatePayment,
    deletePayment
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};