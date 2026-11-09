import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (search: string) => void;
  search: string
}

export default function SearchBox({onSearch, search}: SearchBoxProps) {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onSearch(event.target.value)
  }

  return (
    <div id="search_box" className={css.input}>
      <input className={css.input} type="text" defaultValue={search} placeholder="Search notes" onChange={handleChange}/>
    </div>
  );
}
