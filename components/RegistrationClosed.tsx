const RegistrationClosed: React.FC = () => {
  return (
    <div className="p-2">
      <div className="text-center p-6 bg-darkerGreen max-w-2xl shadow-lg rounded-lg mx-auto">
        <p className="text-lg font-medium">
          Anmälan är inte öppen än.
          <br />
          Håll utkik – vi öppnar den när inbjudningarna har skickats ut. Välkommen tillbaka då!
        </p>
      </div>
    </div>
  );
};

export default RegistrationClosed;
