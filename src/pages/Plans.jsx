import { useEffect, useState } from 'react'
import { db } from '../services/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  onSnapshot
} from 'firebase/firestore'
import { loadStripe } from '@stripe/stripe-js'
import './Plans.css'
import { useSelector } from 'react-redux'

const Plans = () => {
  const [products, setProducts] = useState([])
  const user = useSelector((state) => state.user.user)
  const [subscription, setSubscription] = useState(null)

  useEffect(() => {
    async function getSubscription() {
      const subsCollectionRef = collection(
        db,
        'customers',
        user.uid,
        'subscriptions'
      )
      const subscriptionSnapshot = await getDocs(subsCollectionRef)
      setSubscription({
        role: subscriptionSnapshot.docs[0].data().role,
        current_period_end:
          subscriptionSnapshot.docs[0].data().current_period_end.seconds,
        current_period_start:
          subscriptionSnapshot.docs[0].data().current_period_start.seconds
      })
    }

    getSubscription()
  }, [user.uid])

  useEffect(() => {
    async function getProducts() {
      try {
        const products = {}
        const documentsCollection = collection(db, 'products')
        const documentsQuery = query(
          documentsCollection,
          where('active', '==', true)
        )
        const documentsSnapshot = await getDocs(documentsQuery)
        documentsSnapshot.docs.forEach(async (doc) => {
          products[doc.id] = doc.data()
          const priceCollectionRef = collection(
            db,
            'products',
            doc.id,
            'prices'
          )
          const priceSnap = await getDocs(priceCollectionRef)
          products[doc.id].prices = {
            priceId: priceSnap.docs[0].id,
            priceData: priceSnap.docs[0].data()
          }
        })
        setProducts(products)
      } catch (error) {
        console.log('Error to get products', error)
      }
    }
    getProducts()
  }, [])

  const loadCheckout = async (priceId) => {
    const customerRef = doc(db, 'customers', user.uid)
    const checkoutColecction = collection(customerRef, 'checkout_sessions')
    await addDoc(checkoutColecction, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    })

    await onSnapshot(checkoutColecction, async (snap) => {
      const { sessionId } = snap.docs[0].data()
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await loadStripe(
        'pk_test_51Mmj4XFlPMUW9FRU8XuA1HTtYapm8oD6WMpp6YJCsWI1H3v49kxOi0p3qqKZixzZX4aDdaGTYv1kJ9gqZ3OiiLdU00d1spfdYY'
      )
      stripe.redirectToCheckout({ sessionId })
    })
  }

  return (
    <div className='plans'>
      <br />
      {subscription && (
        <p>
          Renewal date:{' '}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role)
        return (
          <div
            className={`${
              isCurrentPackage && 'plans__plan--disabled'
            } plans__plan`}
            key={productId}
          >
            <div className='plans__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() => {
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }}
            >
              {isCurrentPackage ? 'Current Package' : 'Subscribe'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Plans
