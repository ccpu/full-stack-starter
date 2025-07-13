import { useEffect, useState } from 'react';

import { Button } from '../components/Button';

export const Popup = () => {
  const [count, setCount] = useState(0);

  const minus = () => {
    if (count > 0) setCount(count - 1);
  };

  const add = () => setCount(count + 1);

  useEffect(() => {
    chrome.storage.sync.get(['count'], (result: { count?: number }) => {
      setCount(result.count ?? 0);
    });
  }, []);

  useEffect(() => {
    void chrome.storage.sync.set({ count });
    void chrome.runtime.sendMessage({ type: 'COUNT', count });
  }, [count]);

  return (
    <div className="w-96 p-6">
      <div className="text-center">
        <h3 className="mb-4 text-lg font-semibold">Extension Popup</h3>

        <div className="mb-6">
          <div className="mb-2 text-2xl font-bold">{count}</div>

          <div className="flex justify-center gap-2">
            <Button onClick={minus} disabled={count <= 0} variant="danger" size="sm">
              -
            </Button>
            <Button onClick={add} variant="primary" size="sm">
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
