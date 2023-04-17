type CenterContainerProps = {
  children: React.ReactNode
  className?: string
}
export function CenterContainer({ children }: CenterContainerProps) {
  const classNameDefault = "mx-8 mt-8 flex flex-col sm:mx-12 md:mx-24 lg:mx-28 xl:mx-auto xl:max-w-6xl"

  return (
    <div className={classNameDefault} >
      {children}
    </div>
  )
}
