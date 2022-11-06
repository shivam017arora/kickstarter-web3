const ProjectCard = ({ title, desc, imgUrl }) => {
  return (
    <div className="flex-auto flex w-1/3 h-1/3 text-center border border-white m-2 p-2 cursor-pointer">
      <img
        src={
          "data:image/png;base64,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"
        }
        alt="cover"
        className="w-32 h-max rounded-2xl"
      />
      <div className="flex flex-col items-start">
        <h1 className="text-2xl m-2 p-2"> {title} </h1>
        <h2 className="text-md text-gray-500 pl-2 ml-2"> {desc} </h2>
      </div>
    </div>
  );
};

export default function Head() {
  return (
    <div className="flex justify-center items-center flex-wrap gap-y-10 m-10">
      <ProjectCard
        title="Business Need"
        desc="My dad needs money for starting a new business"
      />
      <ProjectCard
        title="Medical Need"
        desc="My son needs money for his operation"
      />
    </div>
  );
}
