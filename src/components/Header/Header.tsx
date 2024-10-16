import { FC, Dispatch, SetStateAction, useRef, useEffect } from 'react';
import cn from 'classnames';
import { InputForm } from '../InputForm';
import { Todo } from '../../types/Todo';
import { Errors } from '../../types/Errors';
import { handleError } from '../../utils/handleError';
import { postTodo, USER_ID } from '../../api/todos';

type Props = {
  uncompletedTodosAmount: number;
  todos: Todo[];
  tempTodo: Todo | null;
  setTempTodo: Dispatch<SetStateAction<Todo | null>>;
  setError: Dispatch<SetStateAction<Errors>>;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const Header: FC<Props> = ({
  setTempTodo,
  uncompletedTodosAmount,
  tempTodo,
  todos,
  setError,
  setTodos,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos, tempTodo]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value.trim();

    if (!inputValue) {
      handleError(setError, Errors.EmptyTitle);

      return;
    }

    const temporaryTodo: Todo = {
      id: 0,
      userId: USER_ID,
      title: inputValue,
      completed: false,
    };

    setTempTodo(temporaryTodo);

    postTodo(temporaryTodo)
      .then(res => {
        setTodos(current => [...current, res]);

        if (inputRef.current?.value) {
          inputRef.current.value = '';
        }

        setTempTodo(null);
      })
      .catch(() => {
        setTempTodo(null);
        handleError(setError, Errors.AddTodo);

        if (inputRef.current?.value) {
          inputRef.current.value = inputValue;
        }
      });
  };

  return (
    <header className="todoapp__header">
      {!!todos.length && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: uncompletedTodosAmount === 0,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <InputForm
        handleSubmit={handleSubmit}
        inputRef={inputRef}
        tempTodo={tempTodo}
      />
    </header>
  );
};
