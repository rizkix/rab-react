package model

func Migrate() {
	db := initDb()
	db.AutoMigrate(&User{}, &Barang{}, &Supplier{})
}
