"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserCart } from '@/app/context/CartContext'
import { getCashPayment, getOnlinePayment } from '@/app/actions/Payment.action'
import { toast } from '@/lib/utils'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  CreditCard, 
  Wallet, 
  MapPin, 
  Phone, 
  FileText,
  ShoppingCart,
  Shield,
  Truck
} from 'lucide-react'

interface Inputs {
  details: string
  city: string
  phone: string
  paymentMethod: string
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash")
  const router = useRouter()
  const { cart, clear } = useUserCart()
  const cartId = cart?.cartId

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>()

  async function onSubmit(values: Inputs) {
    if (!cartId) {
      toast({
        title: "No cart found",
        description: "Your cart is empty or unavailable.",
        type: "error"
      })
      return
    }

    try {
      if (paymentMethod === "cash") {
        const response = await getCashPayment(cartId, values)
        if (response?.status === 201 || response?.message === "success") {
          toast({ 
            title: "Order placed successfully",
            description: "Delivery will contact you ASAP",
            type: "success" 
          })
          await clear()
          router.push("/")
        }
      } else {
        const origin = typeof window !== 'undefined' ? window.location.origin : ''
        const response = await getOnlinePayment(cartId, values, origin)
        if (response?.status === 200 || response?.message === "success") {
          const paymentUrl = response?.data?.session?.url || response?.data?.url
          if (paymentUrl) {
            try {
              if (typeof window !== 'undefined') {
                window.sessionStorage.setItem('lastOrderItems', JSON.stringify(cart?.data?.products || []))
              }
            } catch {}
            router.push(paymentUrl)
          } else {
            toast({ 
              title: "Payment Error", 
              description: "Failed to get checkout URL.", 
              type: "error" 
            })
          }
        }
      }
    } catch (error) {
      console.error("Checkout failed:", error)
      toast({ 
        title: "Checkout Error", 
        description: "There was a problem processing your order. Please try again.", 
        type: "error" 
      })
    }
  }

  // Calculate total (you can pass this as props or get from cart context)
  const subtotal = Number(cart?.data?.totalCartPrice) || 0
  const shipping = 0 // Free shipping or calculate based on location
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold">Secure Checkout</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="hidden sm:inline">SSL Secured</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Shipping Information Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold">Shipping Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="flex items-center gap-2 mb-2 text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      Delivery Address
                    </Label>
                    <Input 
                      placeholder="Enter your full address"
                      className="h-12 px-4 border-gray-200 focus:border-blue-500 transition-colors"
                      {...register("details", { required: "Address is required" })}
                    />
                    {errors.details && (
                      <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="flex items-center gap-2 mb-2 text-sm font-medium">
                        <FileText className="w-4 h-4" />
                        City
                      </Label>
                      <Input 
                        placeholder="Enter city"
                        className="h-12 px-4 border-gray-200 focus:border-blue-500 transition-colors"
                        {...register("city", { required: "City is required" })}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 mb-2 text-sm font-medium">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </Label>
                      <Input 
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        className="h-12 px-4 border-gray-200 focus:border-blue-500 transition-colors"
                        {...register("phone", { 
                          required: "Phone is required",
                          pattern: {
                            value: /^01[0-2,5]{1}[0-9]{8}$/,
                            message: "Invalid Egyptian phone number"
                          }
                        })}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                </div>

                <RadioGroup 
                  onValueChange={(value) => setPaymentMethod(value as "cash" | "online")} 
                  defaultValue="cash"
                  className="space-y-3"
                >
                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="cash" id="cash" className="text-blue-600" />
                      <Wallet className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive</p>
                      </div>
                    </div>
                  </label>

                  <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'online' ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="online" id="online" className="text-blue-600" />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Online Payment</p>
                        <p className="text-sm text-gray-500">Credit/Debit Card</p>
                      </div>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              {/* Submit Button - Mobile/Tablet */}
              <div className="lg:hidden">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Processing...
                    </span>
                  ) : (
                    `Place Order • EGP ${Number(total).toFixed(2)}`
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary - Desktop */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 pb-4 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">EGP {Number(subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">
                    {shipping === 0 ? 'FREE' : `EGP ${Number(shipping).toFixed(2)}`}
                  </span>
                </div>
              </div>ىح

              <div className="flex justify-between text-lg font-semibold mt-4 mb-6">
                <span>Total</span>
                <span className="text-blue-600">EGP {Number(total).toFixed(2)}</span>
              </div>

              {/* Desktop Submit Button */}
              <Button 
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hidden lg:flex items-center justify-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Processing...
                  </span>
                ) : (
                  'Complete Order'
                )}
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-blue-500" />
                  <span>Fast & Safe Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}