export default function TackPage() {

  /**
   * Denna sidan visas efter att man skickat inte in anmälan
   */

return (
      <div className="p-2">
        <div className="text-center p-6 bg-darkerGreen max-w-2xl shadow-lg rounded-lg mx-auto">
          <p className="text-lg font-medium">
            Tack för din anmälan! <br></br>Du kommer att få ett mail som bekräftar din anmälan inom kort.<br></br> Notera att anmälan inte medför platsgaranti.
          </p>
        </div>
      </div>
    );

}