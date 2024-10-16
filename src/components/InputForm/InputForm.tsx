import { FC, FormEventHandler, MutableRefObject } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  tempTodo: Todo | null;
};

export const InputForm: FC<Props> = ({ handleSubmit, inputRef, tempTodo }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        disabled={!!tempTodo}
      />
    </form>
  );
};
