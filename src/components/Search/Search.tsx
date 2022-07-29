import { UndoOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";

interface SearchProps {
    defaultValue?: string;
    onSearch?: (value: string) => void;
    onClearSearch?: () => void;
}

const Search: React.FC<SearchProps> = (props: SearchProps)=> {
    const { defaultValue, onSearch, onClearSearch } = props;
    const [keyword, setKeyword] = useState(defaultValue);
    const handleSearch = (value: string) => onSearch && onSearch(value);
    const handleClearSearch = () => {
        setKeyword("");
        onClearSearch && onClearSearch();
    }

    return (
        <div className="index-page-header-search">
            <Input.Search
                value={keyword}
                placeholder="Tìm kiếm..."
                style={{ width: 200 }}
                onChange={(e) => setKeyword(e.target.value)}
                onSearch={handleSearch}
            />
            {keyword && (
                <Button
                    icon={<UndoOutlined />}
                    onClick={handleClearSearch}
                />
            )}
        </div>
    );
}

Search.defaultProps = {
    defaultValue: "",
    onSearch: () => {},
    onClearSearch: () => {},
}

export default Search;