const RegistrationClosed: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="card-surface mx-auto max-w-xl border-t-4 border-gold p-10 text-center">
        <h1 className="font-serif text-3xl font-semibold text-navy">
          Anmälan öppnar snart
        </h1>
        <div className="rule-gold mx-auto my-5 w-28" />
        <p className="text-ink">
          Vi öppnar anmälan när inbjudningarna har skickats ut.
          <br />
          Välkommen tillbaka då!
        </p>
      </div>
    </div>
  );
};

export default RegistrationClosed;
