import React from "react";
import "./SearchResultPanel.scss";
import PropTypes from "prop-types";
import _ from "lodash";
import BaseButton from "../BaseButton";
import SearchResultPreview from "../SearchResultPreview";

const SearchResultPanel = props => {
  const {
    results,
    isSearching,
    clearSearch = () => {
    }
  } = props;
  
  return (
    <div className={"search-result-panel-wrapper"}>
      <div className={"heading bg-light-periwinkle padding-tb-responsive padding-lr-responsive"}>Search results.
        <BaseButton content={"Clear"} className={"clear text-link-small-blue underline p-0"}
                    onClick={() => {
                      clearSearch();
                    }}/>
      </div>
      
      <div className={"below-wrapper"}>
        {_.isArray(results) &&
        <div className={"results-wrapper"}>
          <SearchResultPreview products={results} isSearching={isSearching}/>
        </div>
        }
      </div>
    </div>
  );
};

SearchResultPanel.defaultProps = {
  results: [],
  isSearching: false,
  clearSearch: () => {
  }
};

SearchResultPanel.propTypes = {
  results: PropTypes.array,
  isSearching: PropTypes.bool,
  clearSearch: PropTypes.func
};

export default SearchResultPanel;
