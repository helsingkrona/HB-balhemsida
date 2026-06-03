export default function TackPage() {

  /**
   * Denna sidan visas efter att man skickat inte in anmälan
   */

return (
      <div className="container mx-auto px-4 py-20">
        <div className="card-surface mx-auto max-w-xl border-t-4 border-gold p-10 text-center">
          <h1 className="font-serif text-3xl font-semibold text-navy">Tack för din anmälan!</h1>
          <div className="rule-gold mx-auto my-5 w-28" />
          <p className="text-ink">
            Du kommer att få ett mail som bekräftar din anmälan inom kort.
            <br />
            Notera att anmälan inte medför platsgaranti.
          </p>
        </div>
      </div>
    );

}