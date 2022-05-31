fn main()
{
	test_string := "abcd \nefg"

	mut a_array := []int{}

	for elem in test_string {
		a_array << elem
	}

	println(a_array)

}