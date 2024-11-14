interface AgThemeProps {
    theme: string;
    handleThemeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const AgTheme = ({ theme, handleThemeChange }: AgThemeProps) => (
    <select
        id="theme-selector"
        value={theme}
        onChange={handleThemeChange}
        style={{ padding: "5px" }}
    >
        <option value="quartz">Quartz</option>
        <option value="material">Material</option>
        <option value="balham">Balham</option>
        <option value="alpine">Alpine</option>
    </select>
);

export default AgTheme;
