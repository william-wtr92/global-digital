const Spinner = () => {
  return (
    <div className="flex justify-center">
      <div
        className="text-surface inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      />
    </div>
  )
}

export default Spinner
