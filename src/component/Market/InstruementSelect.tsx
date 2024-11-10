import AsyncSelect from "react-select/async";
import { useCallback, useState } from "react";

// Define types for the props
interface MarketDataItem {
  short_name: string;
}

interface Option {
  value: string;
  label: string;
}

interface InstrumentSearchProps {
  marketData: MarketDataItem[];
  onChange: (option: Option | null) => void;
  placeholder?: string;
}

const InstrumentSearch: React.FC<InstrumentSearchProps> = ({
  marketData,
  onChange,
  placeholder,
}) => {
  const [loading, setLoading] = useState(false);

  // Filter function to load options asynchronously based on the search term
  const loadOptions = useCallback(
    (inputValue: string, callback: (options: Option[]) => void) => {
      setLoading(true);

      // If input is empty, show all available options
      const filteredOptions: Option[] = inputValue
        ? Array.from(new Set(marketData.map((item) => item.short_name)))
            .filter((name) => name.toLowerCase().includes(inputValue.toLowerCase()))
            .sort()
            .map((name) => ({ value: name, label: name }))
        : Array.from(new Set(marketData.map((item) => item.short_name)))
            .sort()
            .map((name) => ({ value: name, label: name }));

      setTimeout(() => {
        setLoading(false);
        callback(filteredOptions);
      }, 500); // Simulating async delay for demo
    },
    [marketData]
  );

  return (
    <AsyncSelect
      loadOptions={loadOptions}
      onChange={onChange}
      isClearable
      isLoading={loading}
      placeholder={placeholder || "Search instrument"}
    />
  );
};

export default InstrumentSearch;
