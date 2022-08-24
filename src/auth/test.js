// Basic Dropdown
import { Dropdown, Anchor } from "atomize";

const menuList = (
  <Div>
    {["Option 1", "Option 2", "Option 3"].map((name, index) => (
      <Anchor d="block" p={{ y: "0.25rem" }}>
        {name}
      </Anchor>
    ))}
  </Div>
);

class BasicDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
    };
  } 

  render() {
    const { showDropdown } = this.state;

    return (
      <Dropdown
        isOpen={showDropdown}
        onClick={() =>
          this.setState({ showDropdown: !showDropdown })
        }
        menu={menuList}
      >
        Click me
      </Dropdown>
    );
  }
}

export default BasicDropdown;