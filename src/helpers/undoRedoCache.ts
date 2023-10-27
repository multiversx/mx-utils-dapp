const CACHE_LIMIT = 1000;

export const UndoRedoCache = () => {
  let _cache: string[] = [];
  let position = -1;

  const append = (value: string) => {
    if (_cache.length >= CACHE_LIMIT) {
      _cache = _cache.slice(1);
    }

    _cache.push(value);
    position++;
  };

  const undo = () => {
    if (_cache[position - 1]) {
      --position;
      return _cache[position];
    }
  };

  const redo = () => {
    if (_cache[position + 1]) {
      ++position;
      return _cache[position];
    }
  };

  return {
    append,
    undo,
    redo
  };
};
