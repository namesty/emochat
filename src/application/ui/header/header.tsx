import React from "react";
import styles from "./header.module.css";
import { Icon } from "../../../core/components/icon/icon";
import { useHistory } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
  text?: string;
  gradient?: string;
  showBackButton?: boolean;
}

export const Header: React.FC<Props> = ({ text, gradient, showBackButton }) => {
  const history = useHistory();

  return (
    <div
      className={styles.container}
      style={{ background: gradient ? gradient : "" }}
    >
      <div className={styles.innerContainer}>
        {showBackButton && (
          <Icon icon={faArrowLeft} onPress={() => history.goBack()} className={styles.icon}/>
        )}
        <p className={styles.text}>{text ? text.toUpperCase() : ""}</p>
      </div>

    </div>
  );
};
