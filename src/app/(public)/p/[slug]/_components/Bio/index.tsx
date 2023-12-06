const Main = (props: { bio: string }) => {
  return (
    <div className="m-4  flex w-full flex-row items-center justify-around gap-4 rounded-lg bg-gray-100 p-8 shadow-lg md:flex-col lg:flex-col">
      <h1 className="text-green-500">His Bio</h1>
      <div>{props.bio}</div>
    </div>
  );
};

export default Main;
