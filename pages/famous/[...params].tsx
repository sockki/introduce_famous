import { useEffect, useState } from "react";
import { Url } from "url";

interface IParams {
    params: string;
}

interface Ifamous {
    id: string;
    name: string;
    country: string;
    industries: string[];
    netWorth: number;
    bio: string[];
    financialAssets: Ifinan[];
    squareImage: Url;
};

interface Ifinan {
    ticker: string;
    numberOfShares: number;
    exerciseOptionPrice?: number;
    currentPrice: number;
}


export default function Detail({ params }: IParams) {
    const id = params || "";
    const [famous, setFamous] = useState<Ifamous | any>({})
    useEffect(() => {
        if (!id) return;

        (async () => {
            const response = await (
                await fetch(
                    `https://billions-api.nomadcoders.workers.dev/person/${id}`
                )
            ).json();
            setFamous(response);
        })();
    }, []);
    return (
        <div className="container">
            <div className="profile">
                <div className="profileimage">
                    <img src={`${famous.squareImage}`} />
                </div>
                <div className="profilecontainer">
                    <h1 className="name">{famous.name}</h1>
                    <div className="networth">NetWorth: {(Math.floor(Math.trunc(famous.netWorth) / 1000) * 1000) / 1000} Billion</div>
                    <div className="networth">Country: {famous.country}</div>
                    <div className="bio">
                        {famous.bio?.map((i: string) => (
                            <span key={i}>{i}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="finan">
                <div className="finantitle">
                    <h1>Financial Assets</h1>
                </div>
                <div className="finanes">
                    {famous.financialAssets?.map((i: Ifinan) => (
                        <div key={i.ticker} className="finaninfo">
                            <span>Ticker: {i.ticker}</span>
                            <span>Shares: {i.numberOfShares}</span>
                            {i.exerciseOptionPrice ? <span>Exercise Price: {i.exerciseOptionPrice}$</span> : null}
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
            .container {
              padding:20px 0;
              margin: 10px 20px;
            }
            .profile {
                background-color:white;
                padding: 40px 30px;
                padding-bottom: 20px;
                border-radius: 20px;
                margin-bottom: 20px;
            }
            .profileimage img{
                max-width: 100%;
                border-radius: 12px;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            }
            .profilecontainer {
                margin: 10px 0;
            }
            .name {
                margin: 15px 0;             
            }
            .networth {
                font-weight: 600;
                margin: 5px 0;
                color: #0e0e0ec1; 
            }
            .bio {
                margin: 10px 0;
                font-weight: 600;
                color: #0e0e0ec1; 
            }
            .finan {
                background-color:white;
                padding: 40px 30px;
                border-radius: 20px;
                margin-bottom: 20px;
            }
            .finantitle {
                margin-bottom: 20px;
            }
            .finanes {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
            .finaninfo {
                display: flex;
                flex-direction: column;
                margin: 20px 10px;
                box-sizing: border-box;
                width: 85%;
                border: solid #858585 1px;
                padding: 8px;
                border-radius: 10px;
            }
            .finaninfo span {
                margin: 10px 0;
                font-weight: 600;
                color: #0e0e0ec1;
            }
            `}</style>
        </div>
    )
}

export function getServerSideProps({ params: { params } }: any) {
    return {
        props: {
            params,
        },
    }
}
