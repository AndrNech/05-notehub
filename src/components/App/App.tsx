import { useState, useEffect } from 'react';
import css from './App.module.css';
import { useQuery } from '@tanstack/react-query';
import { Toaster, toast } from 'react-hot-toast';
import { useDebouncedCallback } from 'use-debounce';


import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

function App() {
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
  });

  useEffect(() => {
    if (isSuccess && data.notes.length === 0) {
      toast.error("You don't have notes yet");
    }
  }, [isSuccess, data]);  

  const handleSearch = useDebouncedCallback((search: string) => 
    {setSearch(search);
    setPage(1)
    }, 1000);

  function handlePageChange(page: number) {
    setPage(page);
  }

  function closeModalHandler() {
    setIsModalOpen(false);
  }

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox search={search} onSearch={handleSearch} />
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}
        {isSuccess && data.totalPages > 1 && (<Pagination
          pageCount={data.totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />)}
        <button className={css.button} onClick={() => {
            setIsModalOpen(true);
          }}>Create note +</button>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <Modal onClose={closeModalHandler}>
        <NoteForm onClose={closeModalHandler} />
      </Modal>}
    </div>
  );
}

export default App;
