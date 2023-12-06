interface IphotoImage {
  style: string;
  src: string;
}
interface IName {
  style: string;
  name: string;
}

interface IJob {
  job: string;
  style: string;
}

const PhotoImage = (props: IphotoImage) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={props.src}
        alt="Profile"
        className="h-24 w-24 rounded-full shadow-lg md:h-40 md:w-40 lg:h-48 lg:w-48"
      />
    </div>
  );
};

const Name = (props: IName) => {
  return (
    <h2 className="mb-2 text-3xl font-bold text-green-600">{props.name}</h2>
  );
};

const Job = (props: IJob) => {
  return <h2 className="text-xl text-gray-700">{props.job}</h2>;
};
const Intro = ({
  name,
  job,
  image,
}: {
  name: string;
  job: string;
  image: string;
}) => {
  return (
    <div className="m-4  flex h-1/3 w-full flex-row items-center justify-around rounded-lg bg-gray-200 p-8 shadow-lg">
      <div className="flex flex-col items-center gap-2 p-4">
        <Name name={name} style="text-3xl font-bold mb-2 text-gray-800" />

        <PhotoImage src={image} style="w-1/3 h-2/3 rounded-lg my-2" />
      </div>
      <div className="flex flex-row items-center">
        <Job job={job} style="text-lg text-gray-600 mr-4" />
      </div>
    </div>
  );
};

export default Intro;
