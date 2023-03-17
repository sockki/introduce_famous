import Seo from "@/components/Seo";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useRouter } from "next/router";
import { title } from "process";

interface Ipeoples {
  id: string;
  name: string;
  squareImage: Url;
  netWorth: number;
  industries: string[];
};

interface Iresult {
  results: Ipeoples[];
};




export default function Home({ results }: Iresult) {
  const router = useRouter();
  const onClick = (id: string) => {
    router.push(`/famous/${id}`);
  }
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((people) => (
        <div key={people.id} onClick={() => onClick(people.id)} className="people">
          <Link href={`/famous/${people.id}`} legacyBehavior>
            <a>
              <img src={`${people.squareImage}`} />
              <h4>{people.name}</h4>
              <div>{(Math.floor(Math.trunc(people.netWorth) / 1000) * 1000) / 1000} Billion/ {people.industries[0]}</div>
            </a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          padding: 50px;
          gap: 20px;
          background-color:white
        }
        .people {
          cursor: pointer;
        }
        .people img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .people:hover img {
          transform: scale(1.05) translateY(-10px);
        }
      `}</style>
    </div>
  );
}


export async function getServerSideProps() {
  const results = await (await fetch(`https://billions-api.nomadcoders.workers.dev/`)).json();
  return {
    props: {
      results,
    }
  }
}


