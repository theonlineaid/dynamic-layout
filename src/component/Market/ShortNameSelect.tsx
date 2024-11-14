import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { useMarket } from '../../context/MarketContext';

interface ShortNameAutocompleteProps {
    filteredData: Array<{ key: string; label: string }>;
}

export default function ShortNameAutocomplete({ filteredData }: ShortNameAutocompleteProps) {
    // const { marketData } = useMarket();

    // const options = filteredData.map(item => ({
    //     key: `${item.orderbook}`,
    //     label: item.filter_name
    // }));

    return (
        <div>
            <Autocomplete
                disablePortal
                options={filteredData}
                // options={options.sort((a, b) => -b.label[0].localeCompare(a.label[0]))}
                // groupBy={(option) => option.label[0]}
                // getOptionLabel={(option) => (typeof option === 'object' ? option.label : option)}
                ListboxProps={{
                    style: { maxHeight: '200px', fontSize: 12, fontWeight: 600 } // Controls dropdown height
                }}
                sx={{ 
                    width: 200,
                    '& .MuiInputBase-root': {
                        height: 35, // Controls the height of the input field
                        fontSize: 12,
                    },
                    '& .MuiAutocomplete-listbox': {
                        maxHeight: 200 // Controls the height of the dropdown list
                    }
                }}
                renderInput={(params) => <TextField {...params} placeholder="Select" size="small" />}
                // freeSolo
            />
        </div>
    );
}
