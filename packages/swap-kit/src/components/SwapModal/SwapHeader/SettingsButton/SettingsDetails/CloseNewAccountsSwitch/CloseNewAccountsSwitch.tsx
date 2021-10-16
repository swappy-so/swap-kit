import { useSwap } from "../../../../../../contexts";

export const CloseNewAccountsSwitch = () => {
  const { isClosingNewAccounts, setIsClosingNewAccounts } = useSwap();

  return (
    <div style={{ display: "none" }}>
      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 0,
          width: "100%",
        }}
      >
        Close new accounts
      </label>
      <input
        type="checkbox"
        checked={isClosingNewAccounts}
        onChange={() => setIsClosingNewAccounts(!isClosingNewAccounts)}
        // color="primary"
      />
    </div>
  );
};
