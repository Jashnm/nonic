const BaseLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen antialiased mx-auto sm:px-5">
      {children}
    </div>
  );
};

export default BaseLayout;
