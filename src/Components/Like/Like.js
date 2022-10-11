import React from "react";
import * as icon from "react-icons/fa";
import styles from "./Like.module.css";

class Like extends React.Component {
  state = {
    likes: null,
  };

  handleClick = () => {
    this.setState({
      likes: this.state.likes + 1,
    });
  };

  render() {
    return (
      <div>
        <button className={styles.btnlike} onClick={this.handleClick}>
          <icon.FaHeart className={styles.icon} />
          {this.state.likes}
        </button>
      </div>
    );
  }
}

export default Like;
