import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { RiSearchLine } from "react-icons/ri";

interface SearchComponentProps {
  isNavbarCollapsed: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  isNavbarCollapsed,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchIconClick = () => {
    setIsSearchInputVisible(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your search function here and pass searchTerm
    if (searchTerm === "") {
      return;
    } else {
      searchFunction(searchTerm);
    }
  };

  const searchFunction = (term: string) => {
    // Implement your search logic here
    console.log("Searching for:", term);
    // You can call your API or perform the search based on the term
  };
  
  const renderSearchIconInputField = () => {
    return (
      <InputGroup>
        {isNavbarCollapsed ? (
          isSearchInputVisible && (
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Search..."
              className="search-nav rounded-3"
            />
          )
        ) : (
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search..."
            className="search-nav rounded-3"
          />
        )}
        <Button
          type="submit"
          variant="outline-none"
          className="rounded-3"
          onClick={handleSearchIconClick}
        >
          <RiSearchLine />
        </Button>
      </InputGroup>
    );
  };

  const handleOutsideSearchInputClick = useCallback(
    (event: Event) => {
      if (
        event.target &&
        !(
          (event.target as Element).matches(".search-component") ||
          (event.target as Element).closest(".search-component")
        )
      ) {
        if (searchTerm === "") {
          setIsSearchInputVisible(false);
        }
        // else if(){
        //   setIsSearchInputVisible(true);
        // }
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideSearchInputClick);
    return () => {
      document.removeEventListener("click", handleOutsideSearchInputClick);
    };
  }, [handleOutsideSearchInputClick]);

  return (
    <Form className="search-component" onSubmit={handleSubmit}>
      {renderSearchIconInputField()}
    </Form>
  );
};

export default SearchComponent;
