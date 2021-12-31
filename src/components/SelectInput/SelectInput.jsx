import { memo, useMemo } from "react";
import { toTitleCase } from "utils/strings";
import { v4 as uuid } from "uuid";

function SelectInput({ label, data, ...rest }) {
  const getOptions = useMemo(() => {
    return () =>
      data.map(function transformToOption(x) {
        if (typeof x == "object") {
          return (
            <option value={x.id} key={uuid()}>
              {toTitleCase(x.name, true)}
            </option>
          );
        }
        return (
          <option value={x} key={uuid()}>
            {toTitleCase(x, true)}
          </option>
        );
      });
  }, [data]);

  return (
    <div className="w-full mb-6">
      <label className="block">
        <span className="text-blue-700 dark:text-gray-400 mb-1">{label}</span>
        <select
          className="block w-full mt-1 bg-transparent dark:text-gray-300"
          {...rest}
        >
          {getOptions()}
        </select>
      </label>
    </div>
  );
}

export default memo(SelectInput);
