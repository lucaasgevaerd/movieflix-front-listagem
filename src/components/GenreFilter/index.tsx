import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Genre } from "../../types/vendor/genre";
import { requestBackEnd } from "../../util/requests";

import './styles.css';

type Props = {
  onSubmitFilter: Function;
};

const GenreFilter = ({ onSubmitFilter }: Props) => {
  const { control, setValue, getValues } = useForm();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreSelect, setGenreSelect] = useState<Genre>({
    id: 0,
    name: "",
  });

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
      setGenreSelect(obj);
      handleGenrerRequest(obj.id)
    } else {
      setValue("id", value.id);
      setValue("name", value.name);
      const obj: Genre = {
        id: getValues("id"),
        name: getValues("name"),
      };
      setGenreSelect(obj);
      handleGenrerRequest(obj.id)
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
            defaultValue={null}
            render={({ field: { onChange } }) => (
              <Select
                classNamePrefix={"genre-filter-selector"}
                getOptionValue={(option) => String(option.id)}
                getOptionLabel={(option) => option.name}
                options={genres}
                placeholder={"Gênero"}
                isClearable
                onChange={(value) => handleChangeGenre(value as Genre)}
              />
            )}
          />
        </form>
      </div>
    </>
  );
};

export default GenreFilter;
