import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useMeQuery } from "../../graphql/generated/graphql";
import { ssrGetProducts } from '../../graphql/generated/page';
import { withApollo } from '../../lib/withApollo';

function Home({ data }) {
  const { user } = useUser();
  const { data: me } = useMeQuery();

  return (
    <div className="text-violet-700">
      <h1>Hello World</h1>
      <pre>
        {JSON.stringify(me, null, 2)}
      </pre>
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return {props:{}}//await getServerPageGetProducts({}, ctx);
  }
});

export default withApollo(
  ssrGetProducts.withPage()(Home)
);