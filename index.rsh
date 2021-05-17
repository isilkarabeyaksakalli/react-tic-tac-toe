'reach 0.1';

const [isOutcome,GameDraw, GameAdmin, GamePlayer] = makeEnum(3);
//const winner = (firedTorpedos) =>((firedTorpedos>50 ? 1: 2));
const AdminInterface = {
    ucret: UInt,
    oyunuBitir: Fun([], Bool),
    transferiGor: Fun([],Null),
};

const OyuncuInterface = {
    hamleYap: Fun([], UInt),
    sonucuGor: Fun([UInt], Null)
}

export const main = Reach.App(
    {},
    [
        Participant('Admin', AdminInterface),
        Participant('Oyuncu', OyuncuInterface)
    ],
    (Admin, Oyuncu) => {
        Admin.only(() => {
            const ucret = declassify(interact.ucret);
        });
        Admin.publish(ucret).pay(ucret);
        commit();
        Oyuncu.pay(ucret);
        var kimKazandi = GameDraw;
        invariant( isOutcome(kimKazandi));
        while (kimKazandi==GameDraw) {
            commit();
            fork()
            .case(
                Admin,
                (() => ({
                    when: declassify(interact.oyunuBitir())
                })),
                () => {
                    continue;
                }
            )
                .case(
                    Oyuncu,
                    (() => {
                        const hamle = declassify(interact.hamleYap());
                        return ({
                            when: hamle != 0,
                            msg: hamle
                        });
                    }),
                    (hamle) => {
                        Oyuncu.only(() => {
                            interact.sonucuGor(hamle);
                        });
                        Admin.only(()=>{
                            interact.transferiGor();
                        });
                        
                        kimKazandi = winner(hamle);
                        continue;
                    }
                )
                .timeout(
                    1024, () => {
                        Admin.publish();
                        continue;
                    }
                );
        }
        transfer(balance()).to(kimKazandi == GameAdmin ? Admin : Oyuncu);
        commit();
        exit();
    }
);