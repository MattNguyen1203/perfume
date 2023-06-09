import React, { useState } from "react";
import styles from "../../styles/order/search.module.css";

import SelectInput from "../../components/select/Select";
import { useSelector } from "react-redux";
import handleDispatch from "../../../../utils/handleDispatch";

const SearchInput = () => {
  const { filter } = useSelector((state) => state.adminOrders);
  const [searchVal, setSearchVal] = useState(Object.values(filter)[0] || "");
  const [typeVal, setTypeVal] = useState("name");

  const handleSearch = () => handleDispatch.order.list.filter({ [typeVal]: searchVal });

  return (
    <div className={styles.search_input}>
      <SelectInput
        list={{ name: "Name", phone: "Phone" }}
        defaultVal={typeVal}
        handleChange={(e) => setTypeVal(e.target.value)}
      />
      <input
        type="text"
        className={styles.value_input}
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        onKeyUp={(event) => event.key === "Enter" && handleSearch()}
      />
      <button type="button" className={styles.submit} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
