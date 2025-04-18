function Button({ text, className = "", onClick }) {
    return (
      <button className={className} onClick={onClick}>
        <p>{text}</p>
      </button>
    );
  }
  
  export default Button;
  