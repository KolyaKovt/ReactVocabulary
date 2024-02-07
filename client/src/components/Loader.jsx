export const Loader = () => {
  return (
    <div className="flex flex-row justify-center items-center fixed z-50 w-[100%] h-[100%] bg-opacity-75 bg-black">
      <span className="w-[100px] mx-auto block loading loading-infinity text-accent"></span>
    </div>
  )
}
