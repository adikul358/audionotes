import checkNoteCount from "@/utils/supabase/checkNoteCount";
import checkUnlocked from "@/utils/supabase/checkUnlocked";
import AppView from "@/views/AppView";

require('dotenv').config()

export default async function AppPage() {
  const unlocked = await checkUnlocked()
  const noteCount = await checkNoteCount()

  return <AppView unlocked={unlocked} noteCount={noteCount} />
}
