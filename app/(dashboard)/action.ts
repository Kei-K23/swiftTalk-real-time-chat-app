"use server";

export async function testAction(formData: FormData) {
  console.log(formData.get("message"));
}
