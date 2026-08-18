import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Wallet, Target, Landmark, ArrowLeftRight, FileText, Heart, ArrowRight, X } from 'lucide-react';

export default function Tools() {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    { id: 'vat', title: 'VAT Calculator', icon: Calculator },
    { id: 'profit', title: 'Profit Calculator', icon: TrendingUp },
    { id: 'markup', title: 'Markup Calculator', icon: DollarSign },
    { id: 'salary', title: 'Salary Calculator', icon: Wallet },
    { id: 'breakeven', title: 'Break-even Calculator', icon: Target },
    { id: 'loan', title: 'Loan Calculator', icon: Landmark },
    { id: 'currency', title: 'Currency Converter', icon: ArrowLeftRight },
    { id: 'invoice', title: 'Invoice Calculator', icon: FileText },
  ];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeTool) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeTool]);

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'vat': return <VATCalculator />;
      case 'profit': return <ProfitCalculator />;
      case 'markup': return <MarkupCalculator />;
      case 'salary': return <SalaryCalculator />;
      case 'breakeven': return <BreakEvenCalculator />;
      case 'loan': return <LoanCalculator />;
      case 'currency': return <CurrencyConverter />;
      case 'invoice': return <InvoiceCalculator />;
      default: return null;
    }
  };

  return (
    <section id="tools" className="container mx-auto px-6 py-20 scroll-mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-primary-500 font-semibold mb-2 uppercase tracking-wider text-sm">Interactive Financial Calculators</p>
        <div className="flex justify-center items-center gap-3">
          <Heart className="text-primary-400 w-5 h-5 fill-primary-300" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Accounting Tools</h2>
          <Heart className="text-primary-400 w-5 h-5 fill-primary-300" />
        </div>
        <div className="w-20 h-1 bg-primary-300 mx-auto mt-3 rounded-full"></div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-sm md:text-base">
          Quickly calculate VAT, profits, salaries, and more with my collection of free, fast, and easy-to-use financial tools designed to help your business.
        </p>
      </div>

      {/* 4-Column Grid of Tool Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {tools.map(tool => (
          <button 
            key={tool.id} 
            onClick={() => setActiveTool(tool.id)}
            className="card !p-8 flex flex-col items-center justify-center text-center hover:border-primary-300 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="p-4 bg-primary-100 dark:bg-slate-700 rounded-2xl mb-4 group-hover:bg-primary-500 transition-colors duration-300">
              <tool.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">{tool.title}</h3>
          </button>
        ))}
      </div>

      {/* Calculator Popup Modal */}
      {activeTool && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in" 
          onClick={() => setActiveTool(null)}
        >
          <div 
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-rose-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                {tools.find(t => t.id === activeTool)?.title}
              </h3>
              <button 
                className="p-2 bg-rose-50 dark:bg-slate-700 rounded-full text-gray-500 hover:text-primary-500 hover:bg-rose-100 transition-colors" 
                onClick={() => setActiveTool(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content (Calculator) */}
            <div className="p-6">
              {renderActiveTool()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// --- Helper Components ---

const CompactInput = ({ label, value, onChange, placeholder }) => (
  <div className="mb-4">
    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
    <input 
      type="number" 
      value={value} 
      onChange={onChange} 
      className="input-field !py-3 !px-4 text-sm" 
      placeholder={placeholder} 
    />
  </div>
);

const ResultBox = ({ label, value }) => (
  <div className="flex justify-between items-center bg-rose-50 dark:bg-slate-700 p-4 rounded-xl mt-2">
    <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
    <span className="font-bold text-primary-600 text-base">{value}</span>
  </div>
);

// --- Individual Calculators ---

const VATCalculator = () => {
  const [amount, setAmount] = useState(100);
  const [vatRate, setVatRate] = useState(10);
  const vatAmount = (amount * vatRate) / 100 || 0;
  const total = parseFloat(amount) + vatAmount;

  return (
    <div>
      <CompactInput label="Amount ($)" value={amount} onChange={e => setAmount(e.target.value)} placeholder="100" />
      <CompactInput label="VAT Rate (%)" value={vatRate} onChange={e => setVatRate(e.target.value)} placeholder="10" />
      <ResultBox label="VAT Amount:" value={`$${vatAmount.toFixed(2)}`} />
      <ResultBox label="Total:" value={`$${total.toFixed(2)}`} />
    </div>
  );
};

const ProfitCalculator = () => {
  const [revenue, setRevenue] = useState(1000);
  const [cost, setCost] = useState(400);
  const profit = (revenue - cost) || 0;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

  return (
    <div>
      <CompactInput label="Revenue ($)" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="1000" />
      <CompactInput label="Cost ($)" value={cost} onChange={e => setCost(e.target.value)} placeholder="400" />
      <ResultBox label="Profit:" value={`$${profit.toFixed(2)}`} />
      <ResultBox label="Margin:" value={`${margin.toFixed(2)}%`} />
    </div>
  );
};

const MarkupCalculator = () => {
  const [cost, setCost] = useState(50);
  const [markup, setMarkup] = useState(20);
  const sellingPrice = parseFloat(cost) + (cost * markup) / 100 || 0;

  return (
    <div>
      <CompactInput label="Cost ($)" value={cost} onChange={e => setCost(e.target.value)} placeholder="50" />
      <CompactInput label="Markup (%)" value={markup} onChange={e => setMarkup(e.target.value)} placeholder="20" />
      <ResultBox label="Selling Price:" value={`$${sellingPrice.toFixed(2)}`} />
    </div>
  );
};

const SalaryCalculator = () => {
  const [basic, setBasic] = useState(1000);
  const [allowance, setAllowance] = useState(200);
  const [deduction, setDeduction] = useState(100);
  const netSalary = parseFloat(basic) + parseFloat(allowance) - parseFloat(deduction) || 0;

  return (
    <div>
      <CompactInput label="Basic Salary ($)" value={basic} onChange={e => setBasic(e.target.value)} placeholder="1000" />
      <CompactInput label="Allowance ($)" value={allowance} onChange={e => setAllowance(e.target.value)} placeholder="200" />
      <CompactInput label="Deduction ($)" value={deduction} onChange={e => setDeduction(e.target.value)} placeholder="100" />
      <ResultBox label="Net Salary:" value={`$${netSalary.toFixed(2)}`} />
    </div>
  );
};

const BreakEvenCalculator = () => {
  const [fixedCost, setFixedCost] = useState(5000);
  const [sellingPrice, setSellingPrice] = useState(50);
  const [variableCost, setVariableCost] = useState(20);
  const breakEvenUnits = sellingPrice > variableCost ? fixedCost / (sellingPrice - variableCost) : 0;

  return (
    <div>
      <CompactInput label="Fixed Cost ($)" value={fixedCost} onChange={e => setFixedCost(e.target.value)} placeholder="5000" />
      <CompactInput label="Selling Price ($)" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} placeholder="50" />
      <CompactInput label="Variable Cost ($)" value={variableCost} onChange={e => setVariableCost(e.target.value)} placeholder="20" />
      <ResultBox label="Break-even Units:" value={`${Math.ceil(breakEvenUnits)}`} />
    </div>
  );
};

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [interest, setInterest] = useState(5);
  const [months, setMonths] = useState(12);
  
  const monthlyInterest = interest / 100 / 12;
  const monthlyPayment = principal * monthlyInterest * Math.pow(1 + monthlyInterest, months) / (Math.pow(1 + monthlyInterest, months) - 1) || 0;

  return (
    <div>
      <CompactInput label="Loan Amount ($)" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="10000" />
      <CompactInput label="Annual Interest (%)" value={interest} onChange={e => setInterest(e.target.value)} placeholder="5" />
      <CompactInput label="Months" value={months} onChange={e => setMonths(e.target.value)} placeholder="12" />
      <ResultBox label="Monthly Payment:" value={`$${monthlyPayment.toFixed(2)}`} />
    </div>
  );
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [rate, setRate] = useState(4100);
  const converted = (amount * rate) || 0;

  return (
    <div>
      <CompactInput label="Amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="100" />
      <CompactInput label="Exchange Rate" value={rate} onChange={e => setRate(e.target.value)} placeholder="4100" />
      <ResultBox label="Converted Amount:" value={converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} />
    </div>
  );
};

const InvoiceCalculator = () => {
  const [subtotal, setSubtotal] = useState(500);
  const [tax, setTax] = useState(10);
  const [discount, setDiscount] = useState(50);
  const total = ((subtotal - discount) * (1 + tax / 100)) || 0;

  return (
    <div>
      <CompactInput label="Subtotal ($)" value={subtotal} onChange={e => setSubtotal(e.target.value)} placeholder="500" />
      <CompactInput label="Tax (%)" value={tax} onChange={e => setTax(e.target.value)} placeholder="10" />
      <CompactInput label="Discount ($)" value={discount} onChange={e => setDiscount(e.target.value)} placeholder="50" />
      <ResultBox label="Final Total:" value={`$${total.toFixed(2)}`} />
    </div>
  );
};