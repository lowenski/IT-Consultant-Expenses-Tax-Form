import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, 
  CreditCard, 
  DollarSign, 
  FileSpreadsheet, 
  Plus, 
  Calendar,
  Building,
  Tag,
  AlignLeft,
  Coffee,
  Plane,
  Monitor,
  FolderMinus,
  CheckCircle2,
  Clock,
  ShieldAlert,
  MapPin,
  TrendingDown,
  Car,
  GraduationCap,
  Wifi,
  Laptop,
  Repeat,
  ShieldHalf,
  Activity,
  Trash2,
  Pencil,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  Shirt,
  User,
  Printer,
  BookOpen,
  Megaphone,
  Landmark,
  ShieldCheck,
  HeartPulse,
  Home,
  Briefcase,
  Wrench
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CATEGORIES = [
  { id: 'advertising', label: 'Advertising & Marketing', icon: Megaphone, color: 'software' },
  { id: 'auto', label: 'Auto (Gas & Repairs)', icon: Car, color: 'auto' },
  { id: 'bank_fees', label: 'Bank & Payment Fees', icon: Landmark, color: 'other' },
  { id: 'insurance', label: 'Business Insurance (Liability, E&O, Cyber)', icon: ShieldCheck, color: 'office' },
  { id: 'education', label: 'Continuous Education', icon: GraduationCap, color: 'education' },
  { id: 'health_ins', label: 'Health Insurance Premiums', icon: HeartPulse, color: 'clothing' },
  { id: 'home_office', label: 'Home Office (% Rent/Utilities)', icon: Home, color: 'tools' },
  { id: 'utilities', label: 'Internet & Phone', icon: Wifi, color: 'utilities' },
  { id: 'legal_pro', label: 'Legal & Professional (CPA, Tax Prep, Lawyers)', icon: Briefcase, color: 'utilities' },
  { id: 'materials', label: 'Materials & Tools', icon: Wrench, color: 'office' },
  { id: 'meals', label: 'Meals (50% Deductible)', icon: Coffee, color: 'meals' },
  { id: 'office', label: 'Office Supplies', icon: FolderMinus, color: 'office' },
  { id: 'software', label: 'Software & Subscriptions', icon: Monitor, color: 'software' },
  { id: 'journals', label: 'Trade Journals & Magazines', icon: BookOpen, color: 'education' },
  { id: 'travel', label: 'Travel & Lodging', icon: Plane, color: 'travel' },
  { id: 'clothing', label: 'Uniforms & Safety Gear', icon: ShieldHalf, color: 'clothing' },
  { id: 'other', label: 'Other', icon: Tag, color: 'other' }
];

const CATEGORY_COLORS = {
  advertising: '#b91c1c', auto: '#047857', bank_fees: '#3f3f46', insurance: '#4338ca',
  education: '#b45309', health_ins: '#be123c', home_office: '#0369a1', utilities: '#0f766e',
  legal_pro: '#1d4ed8', materials: '#a21caf', meals: '#c2410c',
  office: '#a16207', software: '#15803d', journals: '#7e22ce', travel: '#4a044e',
  clothing: '#831843', other: '#334155'
};

const FREQUENCIES = [
  { id: 'one-time', label: 'One-time Expense', multiplier: 1, suffix: '' },
  { id: 'daily-all', label: 'Daily [365 Days] (x365)', multiplier: 365, suffix: '/day' },
  { id: 'daily-work', label: 'Daily [Workdays Only] (x260)', multiplier: 260, suffix: '/wday' },
  { id: 'weekly', label: 'Weekly (x52)', multiplier: 52, suffix: '/wk' },
  { id: 'monthly', label: 'Monthly (x12)', multiplier: 12, suffix: '/mo' },
  { id: 'quarterly', label: 'Quarterly [Every 3 Mos] (x4)', multiplier: 4, suffix: '/qtr' },
  { id: 'biannually', label: 'Semi-Annually [Every 6 Mos] (x2)', multiplier: 2, suffix: '/half-yr' },
  { id: 'yearly', label: 'Yearly (x1)', multiplier: 1, suffix: '/yr' }
];

const JURISDICTIONS = [
  { id: 'AL', name: 'Alabama' },
  { id: 'AK', name: 'Alaska' },
  { id: 'AZ', name: 'Arizona' },
  { id: 'AR', name: 'Arkansas' },
  { id: 'CA', name: 'California' },
  { id: 'CO', name: 'Colorado' },
  { id: 'CT', name: 'Connecticut' },
  { id: 'DE', name: 'Delaware' },
  { id: 'DC', name: 'District of Columbia' },
  { id: 'FL', name: 'Florida' },
  { id: 'GA', name: 'Georgia' },
  { id: 'HI', name: 'Hawaii' },
  { id: 'ID', name: 'Idaho' },
  { id: 'IL', name: 'Illinois' },
  { id: 'IN', name: 'Indiana' },
  { id: 'IA', name: 'Iowa' },
  { id: 'KS', name: 'Kansas' },
  { id: 'KY', name: 'Kentucky' },
  { id: 'LA', name: 'Louisiana' },
  { id: 'ME', name: 'Maine' },
  { id: 'MD', name: 'Maryland' },
  { id: 'MA', name: 'Massachusetts' },
  { id: 'MI', name: 'Michigan' },
  { id: 'MN', name: 'Minnesota' },
  { id: 'MS', name: 'Mississippi' },
  { id: 'MO', name: 'Missouri' },
  { id: 'MT', name: 'Montana' },
  { id: 'NE', name: 'Nebraska' },
  { id: 'NV', name: 'Nevada' },
  { id: 'NH', name: 'New Hampshire' },
  { id: 'NJ', name: 'New Jersey' },
  { id: 'NM', name: 'New Mexico' },
  { id: 'NY', name: 'New York' },
  { id: 'NC', name: 'North Carolina' },
  { id: 'ND', name: 'North Dakota' },
  { id: 'OH', name: 'Ohio' },
  { id: 'OK', name: 'Oklahoma' },
  { id: 'OR', name: 'Oregon' },
  { id: 'PA', name: 'Pennsylvania' },
  { id: 'PR', name: 'Puerto Rico (Act 60)' },
  { id: 'RI', name: 'Rhode Island' },
  { id: 'SC', name: 'South Carolina' },
  { id: 'SD', name: 'South Dakota' },
  { id: 'TN', name: 'Tennessee' },
  { id: 'TX', name: 'Texas' },
  { id: 'UT', name: 'Utah' },
  { id: 'VT', name: 'Vermont' },
  { id: 'VA', name: 'Virginia' },
  { id: 'WA', name: 'Washington' },
  { id: 'WV', name: 'West Virginia' },
  { id: 'WI', name: 'Wisconsin' },
  { id: 'WY', name: 'Wyoming' }
];

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('consultant_expenses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [taxData, setTaxData] = useState(() => {
    const saved = localStorage.getItem('consultant_tax_data');
    return saved ? JSON.parse(saved) : { 
      income: '', location: 'FL', riskLevel: 'medium',
      fullName: '', businessName: '', taxYear: new Date().getFullYear().toString()
    };
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [synced, setSynced] = useState(false);
  
  // Sorting State
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedExpenses = useMemo(() => {
    let sortableItems = [...expenses];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (sortConfig.key === 'totalAnnualAmount' || sortConfig.key === 'baseAmount') {
          aVal = parseFloat(aVal) || 0;
          bVal = parseFloat(bVal) || 0;
        }
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [expenses, sortConfig]);

  const pieData = useMemo(() => {
    return CATEGORIES.map(cat => ({
      name: cat.label.split('(')[0].trim(), // Clean, short label for legend
      value: expenses.filter(e => e.category === cat.id).reduce((sum, item) => sum + parseFloat(item.totalAnnualAmount), 0),
      fill: CATEGORY_COLORS[cat.id] || '#94a3b8',
      categoryId: cat.id
    })).filter(item => item.value > 0).sort((a, b) => b.value - a.value);
  }, [expenses]);

  const topCategories = useMemo(() => {
    const top = [...pieData].slice(0, 3);
    while (top.length < 3) {
      top.push({ name: 'Awaiting Data', value: 0, fill: '#cbd5e1', categoryId: 'other' });
    }
    return top;
  }, [pieData]);

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown size={12} style={{ opacity: 0.3, marginLeft: '4px', display: 'inline' }} />;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp size={12} style={{ marginLeft: '4px', display: 'inline', color: 'var(--primary)' }} /> : 
      <ChevronDown size={12} style={{ marginLeft: '4px', display: 'inline', color: 'var(--primary)' }} />;
  };

  // default back to medium if missing due to prior localStorage state
  const riskLevel = taxData.riskLevel || 'medium';

  const [homeSqFt, setHomeSqFt] = useState('');
  const [officeSqFt, setOfficeSqFt] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    merchant: '',
    category: 'advertising',
    frequency: 'one-time',
    baseAmount: '',
    description: ''
  });

  useEffect(() => {
    localStorage.setItem('consultant_expenses', JSON.stringify(expenses));
    localStorage.setItem('consultant_tax_data', JSON.stringify(taxData));
  }, [expenses, taxData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTaxDataChange = (e) => {
    const { name, value } = e.target;
    setTaxData(prev => ({ ...prev, [name]: value }));
  };

  const handleIncomeChange = (e) => {
    // Strip all non-numeric characters
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setTaxData(prev => ({ ...prev, income: numericValue }));
  };

  const calculateTotalNum = () => {
    return expenses.reduce((sum, item) => sum + parseFloat(item.totalAnnualAmount), 0);
  };

  const calculateTotal = () => {
    return calculateTotalNum().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getCategoryTotal = (catId) => {
    return expenses
      .filter(item => item.category === catId)
      .reduce((sum, item) => sum + parseFloat(item.totalAnnualAmount), 0)
      .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  let effectiveModifier = 1;
  let isHomeOfficeHelperActive = false;
  let isMealsHelperActive = false;
  
  if (formData.category === 'home_office' && parseFloat(officeSqFt) > 0 && parseFloat(homeSqFt) > 0) {
    effectiveModifier = parseFloat(officeSqFt) / parseFloat(homeSqFt);
    isHomeOfficeHelperActive = true;
  } else if (formData.category === 'meals') {
    effectiveModifier = 0.5;
    isMealsHelperActive = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.baseAmount || !formData.date || !formData.merchant) return;

    const baseVal = parseFloat(formData.baseAmount) * effectiveModifier;
    const freqObj = FREQUENCIES.find(f => f.id === formData.frequency) || FREQUENCIES[0];
    const annualizedVal = baseVal * freqObj.multiplier;
    
    let finalDesc = formData.description || "";
    // Cleanse any existing duplicate IRS notes from prior saves perfectly when editing!
    finalDesc = finalDesc.replace(/\s*\(Calculated at [\d.]+%\sIRS deduction of \$[\d.]+\stotal\)/g, '').trim();
    finalDesc = finalDesc.replace(/\s*\(IRS 50% limit applied to \$[\d.]+\sreceipt\)/g, '').trim();

    if (isHomeOfficeHelperActive) {
      const calcStr = `(Calculated at ${(effectiveModifier * 100).toFixed(1)}% IRS deduction of $${parseFloat(formData.baseAmount).toFixed(2)} total)`;
      finalDesc = finalDesc ? `${finalDesc} ${calcStr}` : calcStr;
    } else if (isMealsHelperActive) {
      const calcStr = `(IRS 50% limit applied to $${parseFloat(formData.baseAmount).toFixed(2)} receipt)`;
      finalDesc = finalDesc ? `${finalDesc} ${calcStr}` : calcStr;
    }

    const newExpense = {
      id: editingId || Date.now().toString(),
      date: formData.date,
      merchant: formData.merchant,
      category: formData.category,
      frequency: formData.frequency,
      baseAmount: baseVal.toFixed(2),
      totalAnnualAmount: annualizedVal.toFixed(2),
      description: finalDesc,
      isSynced: false
    };

    if (editingId) {
      setExpenses(prev => prev.map(e => e.id === editingId ? newExpense : e));
      setEditingId(null);
    } else {
      setExpenses([newExpense, ...expenses]);
    }

    setFormData({
      date: new Date().toISOString().split('T')[0],
      merchant: '',
      category: 'advertising',
      frequency: 'one-time',
      baseAmount: '',
      description: ''
    });
    setHomeSqFt('');
    setOfficeSqFt('');
    setSynced(false);
  };

  const handleDelete = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const handleEdit = (id) => {
    const itemToEdit = expenses.find(e => e.id === id);
    if (itemToEdit) {
      setFormData({
        date: itemToEdit.date,
        merchant: itemToEdit.merchant,
        category: itemToEdit.category,
        frequency: itemToEdit.frequency || 'one-time',
        baseAmount: itemToEdit.baseAmount,
        description: itemToEdit.description || ''
      });
      setEditingId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Draw user eyes immediately to the form schema!
    }
  };

  const handleGoogleSheetsSync = () => {
    setIsSyncing(true);

    try {
      // Build functional CSV payload synchronously to bypass browser pop-up blocks
      const headers = ['Date', 'Vendor', 'Category', 'Purpose', 'Base Rate', 'Annual Total'];
      const csvRows = expenses.map(exp => {
        const dateStr = `"${formatExpenseDate(exp)}"`;
        const vendorStr = `"${(exp.merchant || '').replace(/"/g, '""')}"`;
        const categoryStr = `"${getDynamicCategoryLabel(exp)}"`;
        const purposeStr = `"${(exp.description || '').replace(/"/g, '""')}"`;
        const baseAmt = `"$${parseFloat(exp.baseAmount).toFixed(2)}"`;
        const totalAmt = `"$${parseFloat(exp.totalAnnualAmount).toFixed(2)}"`;
        return [dateStr, vendorStr, categoryStr, purposeStr, baseAmt, totalAmt].join(',');
      });
      
      const csvContent = headers.join(',') + '\n' + csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Tax_Ledgers_Export_${new Date().toISOString().split('T')[0]}.csv`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Export failed', err);
    }

    setTimeout(() => {
      setIsSyncing(false);
      setSynced(true);
      setExpenses(prev => prev.map(exp => ({ ...exp, isSynced: true })));
      setTimeout(() => setSynced(false), 4000);
    }, 1200);
  };

  const getCategoryInfo = (catId) => {
    return CATEGORIES.find(c => c.id === catId) || CATEGORIES[CATEGORIES.length - 1];
  };

  const getDynamicCategoryLabel = (expense) => {
    const baseObj = getCategoryInfo(expense.category);
    if (!baseObj) return 'Other';
    if (expense.category === 'home_office') {
      const match = expense.description?.match(/Calculated at ([\d.]+)%/);
      if (match) {
        return `Home Office (${match[1]}%)`;
      }
      return 'Home Office';
    }
    return baseObj.label;
  };

  const getFrequencySuffix = (freqId) => {
    return FREQUENCIES.find(f => f.id === freqId)?.suffix || '';
  };

  const formatExpenseDate = (expense) => {
    const rawDate = new Date(expense.date).toLocaleDateString();
    if (expense.frequency === 'one-time' || expense.frequency === 'yearly') {
      return rawDate;
    }
    if (expense.frequency === 'daily-work') return `Ongoing Workdays (260x)`;
    if (expense.frequency === 'daily-all') return `Ongoing Daily (365x)`;
    if (expense.frequency === 'weekly') return `Ongoing Weekly (52x)`;
    if (expense.frequency === 'monthly') return `Ongoing Monthly (12x)`;
    if (expense.frequency === 'quarterly') return `Ongoing Quarterly (4x)`;
    return rawDate;
  };

  // Tax Risk Strategy Logic
  const totalExpenses = calculateTotalNum();
  const income = parseFloat(taxData.income) || 0;
  
  // Safe Percentage based on Location & Chosen Risk Appetite
  let safePercentage = 0.20;
  
  if (taxData.location === 'PR') {
    // Puerto Rico Act 60 typically allows higher structural bounds for remote consultants, 
    // but the risk principle remains scaling upwards.
    if (riskLevel === 'low') safePercentage = 0.20;
    if (riskLevel === 'medium') safePercentage = 0.30;
    if (riskLevel === 'high') safePercentage = 0.40;
  } else {
    // All 50 US States generally conform to a standard Federal baseline for remote IT consultants
    if (riskLevel === 'low') safePercentage = 0.15;
    if (riskLevel === 'medium') safePercentage = 0.25;
    if (riskLevel === 'high') safePercentage = 0.35;
  }

  const maxSafeExpenses = income * safePercentage;
  
  let riskPercent = 0;
  if (maxSafeExpenses > 0) {
    riskPercent = (totalExpenses / maxSafeExpenses) * 100;
  }
  
  // Bar styling based *only* on how close you are to your explicitly CHOSEN risk ceiling.
  let barColor = 'var(--primary)'; // Professional Blue-Gray
  let barLabel = 'Within Selected Risk Limit';

  if (riskPercent > 85) {
    barColor = '#eab308'; // Warning Yellow: nearing the chosen boundary
    barLabel = 'Nearing Selected Target';
  }
  if (riskPercent > 100 || (income === 0 && totalExpenses > 0)) {
    barColor = '#be123c'; // Danger Red (exceeded user's chosen risk level limits)
    barLabel = 'Exceeded Selected Tolerance!';
  }

  // Pre-calculate live total before submitting
  const liveBase = parseFloat(formData.baseAmount) || 0;
  const liveFreq = FREQUENCIES.find(f => f.id === formData.frequency)?.multiplier || 1;
  const liveEffectiveBase = liveBase * effectiveModifier;
  const liveAnnual = liveEffectiveBase * liveFreq;

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* DEDICATED PRINT DOCUMENT LAYER (Only visible when printing) */}
      {/* ------------------------------------------------------------------ */}
      <div className="print-document">
        <div className="print-header-formal">
          <div className="print-header-left">
            <h1>{taxData.businessName || 'INDEPENDENT CONSULTANT'}</h1>
            <h2>{taxData.fullName || 'Consultant Name'}</h2>
            <p>Tax Year: <strong>{taxData.taxYear || new Date().getFullYear()}</strong></p>
            <p>Jurisdiction: {JURISDICTIONS.find(j => j.id === taxData.location)?.name || taxData.location}</p>
          </div>
          <div className="print-header-right">
            <h1>EXPENSE LEDGER</h1>
            <p className="print-date">Generated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="print-summary-metrics">
          <div className="print-metric">
            <span>Gross Income</span>
            <strong>${(parseFloat(taxData.income) || 0).toLocaleString('en-US')}</strong>
          </div>
          <div className="print-metric">
            <span>Total Deductions</span>
            <strong>${calculateTotalNum().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
          </div>
        </div>

        <table className="print-table">
          <thead>
            <tr>
              <th style={{ width: '12%' }}>Date</th>
              <th style={{ width: '25%' }}>Vendor / Merchant</th>
              <th style={{ width: '20%' }}>Category</th>
              <th style={{ width: '28%' }}>Business Purpose</th>
              <th align="right" style={{ width: '15%' }}>Annual Total</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No records found.</td></tr>
            ) : (
              sortedExpenses.map((expense) => {
                const catLabel = getDynamicCategoryLabel(expense);
                const isRecurring = expense.frequency !== 'one-time' && expense.frequency !== 'yearly';
                const freqLabel = FREQUENCIES.find(f => f.id === expense.frequency)?.label || expense.frequency;
                return (
                  <tr key={expense.id}>
                    <td>{formatExpenseDate(expense)}</td>
                    <td>{expense.merchant}</td>
                    <td>{catLabel}</td>
                    <td>{expense.description || '-'}</td>
                    <td style={{ textAlign: 'right' }}>
                      ${parseFloat(expense.totalAnnualAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      {isRecurring && <div style={{ fontSize: '0.7em', color: '#666' }}>{freqLabel}</div>}
                    </td>
                  </tr>
                );
              })
            )}
            {sortedExpenses.length > 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'right', fontWeight: 600, borderBottom: 'none', paddingTop: '20px', fontSize: '11pt' }}>Grand Total Deductions:</td>
                <td align="right" style={{ fontWeight: 700, borderBottom: 'none', paddingTop: '20px', fontSize: '11pt' }}>
                  ${calculateTotalNum().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="print-footer">
          <p>This document details the annualized business deductions prepared for tax calculation purposes.</p>
          <p>Preserve corresponding physical or digital receipts for all items listed above in case of audit.</p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* INTERACTIVE SPA DASHBOARD (Hidden entirely when printing) */}
      {/* ------------------------------------------------------------------ */}
      <div className="app-container">
        <header className="header" style={{ alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Building2 size={28} color="var(--primary)" />
              <h1>IT Consultant Expenses</h1>
            </div>
          </div>
          
          <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
            <button className="print-btn" onClick={() => window.print()}>
              <Printer size={16} /> Print Tax Report
            </button>
            <button className="google-sheets-btn" onClick={handleGoogleSheetsSync} disabled={isSyncing}>
              {isSyncing ? (
                <>
                  <span className="spinner"></span> Exporting CSV...
                </>
              ) : synced ? (
                <>
                  <CheckCircle2 size={16} color="var(--success)" /> Export Complete
                </>
              ) : (
                <>
                  <FileSpreadsheet size={16} color="var(--primary)" /> Export to Excel
                </>
              )}
            </button>
          </div>
        </header>

        <div className="sidebar">
          {/* Profile Container */}
          <section className="glass-panel profile-container" style={{ padding: '24px', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <User size={18} color="var(--primary)" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Consultant Profile</h2>
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label>Full Name</label>
              <input type="text" name="fullName" value={taxData.fullName || ''} onChange={handleTaxDataChange} className="form-input" placeholder="e.g. Jane Doe" />
            </div>
            <div className="form-group" style={{ marginBottom: '12px' }}>
              <label>Business / LLC Name</label>
              <input type="text" name="businessName" value={taxData.businessName || ''} onChange={handleTaxDataChange} className="form-input" placeholder="e.g. Apex IT Consulting" />
            </div>
            <div className="form-group">
              <label>Tax Year</label>
              <input type="number" name="taxYear" value={taxData.taxYear || ''} onChange={handleTaxDataChange} className="form-input" placeholder={new Date().getFullYear().toString()} />
            </div>
          </section>

          {/* Expense Form */}
          <section className="glass-panel expense-form-container" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Plus size={18} color="var(--primary)" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Add Business Record</h2>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label><Calendar size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--text-muted)' }} />Date / Start Date</label>
                <input 
                  type="date" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleInputChange} 
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label><Building size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--text-muted)' }} />Vendor / Merchant</label>
                <input 
                  type="text" 
                  name="merchant" 
                  placeholder="e.g. AWS, Shell, Safety Depot" 
                  value={formData.merchant} 
                  onChange={handleInputChange} 
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label><Tag size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--text-muted)' }} />Expense Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange} 
                  className="form-input"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label><Repeat size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--text-muted)' }} />Frequency</label>
                <select 
                  name="frequency" 
                  value={formData.frequency} 
                  onChange={handleInputChange} 
                  className="form-input"
                >
                  {FREQUENCIES.map(freq => (
                    <option key={freq.id} value={freq.id}>{freq.label}</option>
                  ))}
                </select>
              </div>

              {formData.category === 'home_office' && (
                <div className="home-office-calc" style={{ background: '#f8fafc', padding: '16px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '12px' }}>
                    <Home size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--primary)' }} />
                    <strong>Home Office IRS Calculator:</strong> Enter your square footage to automatically lock in your exact deduction percentage.
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '12px' }}>
                    <div className="form-group">
                      <label style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Total Home (Sq Ft)</label>
                      <input type="number" value={homeSqFt} onChange={(e) => setHomeSqFt(e.target.value)} className="form-input" placeholder="e.g. 1500" style={{ width: '100%', boxSizing: 'border-box', minWidth: 0 }} />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Office Space (Sq Ft)</label>
                      <input type="number" value={officeSqFt} onChange={(e) => setOfficeSqFt(e.target.value)} className="form-input" placeholder="e.g. 150" style={{ width: '100%', boxSizing: 'border-box', minWidth: 0 }} />
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: isHomeOfficeHelperActive ? 'var(--success)' : '#eab308', marginTop: '12px', fontWeight: 600 }}>
                    Active Deductible Percentage: {isHomeOfficeHelperActive ? (effectiveModifier * 100).toFixed(1) : '0.0'}%
                  </div>

                  <details style={{ marginTop: '14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 500, color: 'var(--primary)', marginBottom: '8px', userSelect: 'none' }}>
                      Not sure of your exact square footage? View US averages guide
                    </summary>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '16px', background: '#f1f5f9', padding: '12px', borderRadius: '6px' }}>
                      <div>
                        <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>Total Home Averages</strong>
                        <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <li>Studio Apt: ~500 sq ft</li>
                          <li>1-Bedroom Apt: ~750 sq ft</li>
                          <li>2-Bedroom Apt: ~1,100 sq ft</li>
                          <li>3-Bedroom Apt: ~1,400 sq ft</li>
                          <li>US Single Family: ~2,200 sq ft</li>
                        </ul>
                      </div>
                      <div>
                        <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>Office / Room Averages</strong>
                        <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <li>Corner Desk Area: ~50 sq ft</li>
                          <li>Small Bedroom/Office: ~100 sq ft</li>
                          <li>Medium Bedroom: ~144 sq ft</li>
                          <li>Large Primary Bed: ~225 sq ft</li>
                          <li>Finished Garage: ~400 sq ft</li>
                        </ul>
                      </div>
                    </div>
                  </details>

                </div>
              )}

              {formData.category === 'meals' && (
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '4px' }}>
                    <Coffee size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--primary)' }} />
                    <strong>IRS Meals & Client Rule:</strong>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Federal law caps business dining. This form will automatically cut the full receipt amount entered below in half.
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '12px', fontWeight: 600 }}>
                    Active Deductible Percentage: 50.0%
                  </div>

                  <details style={{ marginTop: '14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 500, color: 'var(--primary)', marginBottom: '8px', userSelect: 'none' }}>
                      View IRS meal limits & M&IE daily averages
                    </summary>
                    <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <p style={{ margin: 0 }}><strong>What is "Reasonable"?</strong> The IRS requires meals not be "lavish or extravagant". ~<strong>$15–$20 per meal</strong> ($30–$40/day) is highly moderate. The standard federal M&IE rate is roughly <strong>$59/day</strong>.</p>
                      <p style={{ margin: 0 }}><strong>Strict Context:</strong> You <em>cannot</em> deduct solo lunches at your regular office. The meal must be with a <strong>business client/associate</strong> OR occurred while traveling <strong>overnight</strong>.</p>
                      <p style={{ margin: 0 }}><strong>Receipts:</strong> The IRS does not explicitly require physical receipts for expenses under <strong>$75</strong>, but a strict record of the date, place, and business agenda is absolutely mandatory.</p>
                    </div>
                  </details>
                </div>
              )}

              <div className="form-group">
                <label>
                  <DollarSign size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--text-muted)' }} />
                  {formData.category === 'home_office' ? 'Full Invoice/Rent Amount' 
                   : formData.category === 'meals' ? 'Full Receipt Amount' 
                   : 'Base Amount'}
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontWeight: 500 }}>$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    min="0"
                    name="baseAmount" 
                    placeholder="0.00" 
                    value={formData.baseAmount} 
                    onChange={handleInputChange} 
                    className="form-input"
                    style={{ paddingLeft: '28px', width: '100%', boxSizing: 'border-box' }}
                    required
                  />
                </div>
                {liveAnnual > 0 && liveBase > 0 && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {isHomeOfficeHelperActive ? (
                      <>Deduction cut: <strong>${liveEffectiveBase.toFixed(2)}</strong> / Annual impact: <strong style={{ color: 'var(--text-main)' }}>${liveAnnual.toFixed(2)}</strong></>
                    ) : isMealsHelperActive ? (
                      <>IRS 50% Limit: <strong>${liveEffectiveBase.toFixed(2)}</strong> / Annual impact: <strong style={{ color: 'var(--text-main)' }}>${liveAnnual.toFixed(2)}</strong></>
                    ) : (
                      liveAnnual > liveBase ? <>Annualized impact: <strong style={{ color: 'var(--text-main)' }}>${liveAnnual.toFixed(2)}</strong> for the year</> : null
                    )}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label><AlignLeft size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--text-muted)' }} />Business Purpose</label>
                <textarea 
                  name="description" 
                  placeholder="Details to justify tax deduction" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  className="form-input"
                  rows="2"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="submit-btn" disabled={isSyncing} style={{ flex: 1, backgroundColor: editingId ? '#0369a1' : 'var(--primary)' }}>
                  {editingId ? 'Update Record' : 'Log Item'}
                </button>
                {editingId && (
                  <button 
                    type="button" 
                    className="submit-btn" 
                    style={{ flex: 1, backgroundColor: '#64748b' }}
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        date: new Date().toISOString().split('T')[0],
                        merchant: '',
                        category: 'advertising',
                        frequency: 'one-time',
                        baseAmount: '',
                        description: ''
                      });
                      setHomeSqFt('');
                      setOfficeSqFt('');
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Tax Strategy Analyzer */}
          <section className="tax-strategy-card">
            <div className="tax-header">
              <h2><ShieldAlert size={20} color="var(--primary)" /> Target Deduction Strategy</h2>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Target Maximum Limit: <strong style={{ color: 'var(--text-main)' }}>${maxSafeExpenses.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>
              </div>
            </div>
            
            <div className="tax-controls" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <div className="form-group">
                <label><DollarSign size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--text-muted)' }} />Gross Income</label>
                <input 
                  type="text" 
                  name="income"
                  value={taxData.income ? Number(taxData.income).toLocaleString('en-US') : ''}
                  onChange={handleIncomeChange}
                  placeholder="e.g. 150,000"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label><MapPin size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--text-muted)' }} />Tax Jurisdiction</label>
                <select 
                  name="location" 
                  value={taxData.location} 
                  onChange={handleTaxDataChange} 
                  className="form-input"
                >
                  {JURISDICTIONS.map(jur => (
                    <option key={jur.id} value={jur.id}>{jur.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label><Activity size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: 'var(--text-muted)' }} />Desired Risk Tolerance</label>
                <select 
                  name="riskLevel" 
                  value={riskLevel} 
                  onChange={handleTaxDataChange} 
                  className="form-input"
                >
                  <option value="low">Conservative (Low Target)</option>
                  <option value="medium">Balanced (Medium Target)</option>
                  <option value="high">Aggressive (High Target)</option>
                </select>
              </div>
            </div>

            <div className="risk-meter">
              <div className="risk-meter-bar">
                <div 
                  className="risk-meter-fill" 
                  style={{ 
                    width: Math.min(riskPercent, 100) + '%', 
                    backgroundColor: Math.max(riskPercent, 0) === 0 ? 'transparent' : barColor 
                  }}>
                </div>
              </div>
              <div className="risk-label">
                <span>Current Return Deductions: ${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span style={{ color: barColor, fontWeight: 600 }}>{barLabel}</span>
              </div>
            </div>
          </section>

          <section className="dashboard-container">
            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="glass-panel stat-card">
                <div className="icon-container">
                  <h3 style={{ textTransform: 'uppercase' }}>Total YTD</h3>
                  <TrendingDown size={18} color="var(--primary)" />
                </div>
                <div className="value" style={{ fontSize: '1.4rem' }}>${calculateTotal()}</div>
              </div>
              
              {topCategories.map((cat, idx) => {
                const CatIcon = CATEGORIES.find(c => c.id === cat.categoryId)?.icon || Tag;
                return (
                  <div key={idx} className="glass-panel stat-card">
                    <div className="icon-container">
                      <h3 style={{ textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={cat.name}>
                        {cat.name}
                      </h3>
                      <CatIcon size={18} color={cat.fill} />
                    </div>
                    <div className="value" style={{ fontSize: '1.4rem' }}>
                      ${cat.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                );
              })}
            </div>

            {pieData.length > 0 && (
              <div className="glass-panel no-print" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>Deduction Distribution Map</h3>
                <div style={{ width: '100%', height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            <div className="glass-panel expenses-list-container">
              <div className="expenses-header">
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <FileSpreadsheet size={18} color="var(--text-muted)" /> Total End-of-Year Ledgers
                </h2>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>{expenses.length} Records</span>
              </div>
              
              {expenses.length === 0 ? (
                <div className="empty-state">
                  <CreditCard size={40} color="var(--panel-border)" style={{ marginBottom: '8px' }} />
                  <p>No expenses recorded yet.</p>
                  <p style={{ fontSize: '0.85rem', maxWidth: '300px' }}>Enter your business expenses on the left to compute your total yearly deductions.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="expenses-table">
                    <thead>
                      <tr>
                        <th onClick={() => requestSort('date')} style={{ cursor: 'pointer', whiteSpace: 'nowrap', width: '14%' }}>
                          Date <SortIcon columnKey="date" />
                        </th>
                        <th onClick={() => requestSort('merchant')} style={{ cursor: 'pointer', width: '14%' }}>
                          Vendor <SortIcon columnKey="merchant" />
                        </th>
                        <th onClick={() => requestSort('category')} style={{ cursor: 'pointer', width: '18%' }}>
                          Category <SortIcon columnKey="category" />
                        </th>
                        <th style={{ width: 'auto' }}>Purpose</th>
                        <th onClick={() => requestSort('baseAmount')} className="amount-col" style={{ cursor: 'pointer', whiteSpace: 'nowrap', width: '12%' }}>
                          Base Rate <SortIcon columnKey="baseAmount" />
                        </th>
                        <th onClick={() => requestSort('totalAnnualAmount')} className="amount-col" style={{ cursor: 'pointer', color: 'var(--text-main)', whiteSpace: 'nowrap', width: '12%' }}>
                          Annual Total <SortIcon columnKey="totalAnnualAmount" />
                        </th>
                        <th style={{ textAlign: 'right', width: '100px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedExpenses.map(expense => {
                        const CatIcon = getCategoryInfo(expense.category)?.icon || Tag;
                        const catColor = getCategoryInfo(expense.category)?.color;
                        const catLabel = getDynamicCategoryLabel(expense);
                        const freqSuffix = getFrequencySuffix(expense.frequency);
                        const isRecurring = expense.frequency !== 'one-time' && expense.frequency !== 'yearly';
                        
                        return (
                          <tr key={expense.id} style={{ backgroundColor: editingId === expense.id ? '#f0f9ff' : 'transparent', outline: editingId === expense.id ? '2px solid #0284c7' : 'none', outlineOffset: '-2px' }}>
                            <td style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>{formatExpenseDate(expense)}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                              <div style={{ fontWeight: 500 }}>{expense.merchant}</div>
                            </td>
                            <td>
                              <span className={`badge ${catColor}`}>
                                <CatIcon size={12} />
                                {catLabel}
                              </span>
                            </td>
                            <td style={{ color: 'var(--text-muted)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {expense.description || '-'}
                            </td>
                            <td className="amount-col" style={{ color: 'var(--text-muted)' }}>
                              ${parseFloat(expense.baseAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{freqSuffix}
                            </td>
                            <td className="amount-col" style={{ fontWeight: 600 }}>
                              ${parseFloat(expense.totalAnnualAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', overflow: 'visible', textOverflow: 'clip' }}>
                              <button onClick={() => handleEdit(expense.id)} className="action-btn edit-btn" title="Edit row">
                                <Pencil size={14} />
                              </button>
                              <button onClick={() => handleDelete(expense.id)} className="action-btn delete-btn" title="Delete row">
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      <style>{`
        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid var(--panel-border);
          border-top: 2px solid var(--primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 900px) {
          .app-container {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .tax-controls {
            grid-template-columns: 1fr !important;
          }
        }

        th[style*="cursor: pointer"]:hover {
          background-color: #e2e8f0;
          color: var(--text-main);
          transition: all 0.2s;
        }
      `}</style>
    </>
  );
}

export default App;
