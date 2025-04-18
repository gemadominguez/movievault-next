'use client'

import styles from './Header.module.css'
import logo from '@/assets/logo.svg'
import SearchBar from './SearchBar'
import Button from './Button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

function TopHeader() {
  const router = useRouter()

  const buttonSurprise = () => {
    router.push('/loading')
  }

  return (
    <div className="grid-12">
      <div className={styles['top-header']}>
        <div className="grid-2">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className={styles['top-header__logo']}
              priority
            />
          </Link>
        </div>

        <div className="grid-6"></div>

        <div className={`grid-4 ${styles['top-header__searchSection']}`}>
          <SearchBar />
          <Button
            text="surprise me"
            className="btn btn--primary"
            onClick={buttonSurprise}
          />
        </div>
      </div>
    </div>
  )
}

export default TopHeader
