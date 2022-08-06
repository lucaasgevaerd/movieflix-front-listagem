import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Genre } from "../../types/vendor/genre";
import { requestBackEnd } from "../../util/requests";

import "./styles.css";

type Props = {
  onSubmitFilter: Function;
  searchParameterGenrer: any;
};

const GenreFilter = ({ onSubmitFilter, searchParameterGenrer }: Props) => {
  const { control, setValue, getValues } = useForm();
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    requestBackEnd({ url: "/genres", withCredentials: true }).then(
      (response) => {
        setGenres(response.data);
      }
    );
  }, []);

  const handleChangeGenre = (value: Genre) => {
    if (value === null) {
      setValue("id", 0);
      setValue("name", "");
      const obj: Genre = {
        id: getValues("id"),
        name: getValues("name"),
      };
      handleGenrerRequest(obj.id);
    } else {
      setValue("id", value.id);
      setValue("name", value.name);
      const obj: Genre = {
        id: getValues("id"),
        name: getValues("name"),
      };
      handleGenrerRequest(obj.id);
    }
  };

  const handleGenrerRequest = (value: number) => {
    onSubmitFilter(value);
  };

  return (
    <>
      <div className="movie-genres-card-container">
        <form className="movie-genres-form-container">
          <Controller
            name="select"
            control={control}
            render={({ field: { onChange } }) => (
              <Select
                classNamePrefix={"genre-filter-selector"}
                options={genres}
                getOptionValue={(option) => String(option.id)}
                getOptionLabel={(option) => option.name}
                placeholder={"Gênero"}
                isClearable
                onChange={(value) => handleChangeGenre(value as Genre)}
                escapeClearsValue={true}
                value={genres.filter(
                  (e) =>
                    e.id === parseInt(searchParameterGenrer) || ''
                )}
              />
            )}
          />
        </form>
      </div>
    </>
  );
};

export default GenreFilter;
