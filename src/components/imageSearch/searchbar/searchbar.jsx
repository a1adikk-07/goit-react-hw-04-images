import { Component } from 'react';
import styles from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ search: this.state.search });
    this.setState({ search: '' });
  };
  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;
    return (
      <header className={styles.searchbar}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <button type="submit" className={styles.button}>
            🔎
          </button>
          <input
            value={search}
            onChange={handleChange}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={styles.input}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
