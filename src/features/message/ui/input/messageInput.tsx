import React from "react";
import styles from "./messageInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faBrain } from "@fortawesome/free-solid-svg-icons";
import { CustomLoader } from "../../../../core/components/loader/loader";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onClickSend?: () => void;
  onClickEmotion?: () => Promise<void>;
  loadingEmotion: boolean;
  online: boolean;
}

export const MessageInput: React.FC<Props> = ({
  onClickSend,
  onClickEmotion,
  online,
  loadingEmotion,
  ...rest
}) => {
  return (
    <div className={styles.container}>
      <input
        {...rest}
        className={styles.input}
        disabled={!online}
        placeholder={online ? "" : "You are offline, attempting to reconnect"}
        data-testid={'message-input'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onClickSend) {
            onClickSend()
          }
        }}
      />
      {loadingEmotion ? (
        <a className={`${styles.button} ${styles.emotionsButton}`}>
          <CustomLoader height={20} width={20} color={"#eeeeee"} />
        </a>
      ) : (
        <a
          className={`${styles.button} ${styles.emotionsButton}`}
          onClick={onClickEmotion}
        >
          <FontAwesomeIcon color={"#eeeeee"} icon={faBrain} />
        </a>
      )}
      <a
        className={`${styles.button} ${styles.sendButton}`}
        onClick={onClickSend}
      >
        <FontAwesomeIcon color={"#eeeeee"} icon={faPaperPlane} />
      </a>
    </div>
  );
};
